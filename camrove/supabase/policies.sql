-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can read all profiles (for search and discovery)
CREATE POLICY "Anyone can view profiles" ON profiles
    FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- STUDIOS POLICIES
-- Anyone can view studios
CREATE POLICY "Anyone can view studios" ON studios
    FOR SELECT USING (true);

-- Studio owners can update their own studio
CREATE POLICY "Studio owners can update own studio" ON studios
    FOR UPDATE USING (auth.uid() = profile_id);

-- Users can create their own studio
CREATE POLICY "Users can create own studio" ON studios
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- SERVICES POLICIES  
-- Anyone can view services
CREATE POLICY "Anyone can view services" ON services
    FOR SELECT USING (true);

-- Only admins can modify services (we'll add admin check later)
CREATE POLICY "Only admins can modify services" ON services
    FOR ALL USING (false); -- Temporary until admin system

-- SERVICE OPTIONS POLICIES
-- Anyone can view service options
CREATE POLICY "Anyone can view service options" ON service_options
    FOR SELECT USING (true);

-- AVAILABILITY SLOTS POLICIES
-- Anyone can view available slots
CREATE POLICY "Anyone can view availability slots" ON availability_slots
    FOR SELECT USING (is_available = true);

-- Studio owners can manage their own slots
CREATE POLICY "Studio owners can manage own slots" ON availability_slots
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM studios 
            WHERE studios.id = availability_slots.studio_id 
            AND studios.profile_id = auth.uid()
        )
    );

-- BOOKINGS POLICIES
-- Clients can view their own bookings
CREATE POLICY "Clients can view own bookings" ON bookings
    FOR SELECT USING (auth.uid() = client_id);

-- Studios can view bookings for their studio
CREATE POLICY "Studios can view their bookings" ON bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM studios 
            WHERE studios.id = bookings.studio_id 
            AND studios.profile_id = auth.uid()
        )
    );

-- Clients can create bookings
CREATE POLICY "Clients can create bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Studios can update bookings for their studio (accept/reject)
CREATE POLICY "Studios can update their bookings" ON bookings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM studios 
            WHERE studios.id = bookings.studio_id 
            AND studios.profile_id = auth.uid()
        )
    );

-- PAYMENTS POLICIES
-- Users can view their own payments
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM bookings 
            WHERE bookings.id = payments.booking_id 
            AND bookings.client_id = auth.uid()
        )
    );

-- Studios can view payments for their bookings
CREATE POLICY "Studios can view their payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM bookings 
            WHERE bookings.id = payments.booking_id 
            AND EXISTS (
                SELECT 1 FROM studios 
                WHERE studios.id = bookings.studio_id 
                AND studios.profile_id = auth.uid()
            )
        )
    );

-- NOTIFICATIONS POLICIES
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- System can insert notifications (using service role)
CREATE POLICY "System can insert notifications" ON notifications
    FOR INSERT WITH CHECK (true); -- Will be restricted by service role

-- ADMIN POLICIES (Placeholder - will be enhanced with admin roles)
-- Admin can view all data
CREATE POLICY "Admin can view all" ON profiles
    FOR SELECT USING (auth.jwt() ->> 'email' = 'admin@camrove.com');

CREATE POLICY "Admin can view all studios" ON studios
    FOR SELECT USING (auth.jwt() ->> 'email' = 'admin@camrove.com');

CREATE POLICY "Admin can view all bookings" ON bookings
    FOR SELECT USING (auth.jwt() ->> 'email' = 'admin@camrove.com');