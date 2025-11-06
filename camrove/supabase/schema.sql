-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table (extends Supabase Auth)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    display_name TEXT,
    role TEXT CHECK (role IN ('client', 'freelancer', 'studio', 'agency')),
    experience_level TEXT,
    team_size TEXT,
    services_offered JSONB,
    equipment JSONB,
    base_locality TEXT,
    travel_radius INTEGER,
    pricing_tier TEXT,
    availability JSONB,
    portfolio_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Studios table
CREATE TABLE studios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) NOT NULL,
    studio_name TEXT NOT NULL,
    description TEXT,
    address JSONB,
    locality TEXT,
    city TEXT DEFAULT 'Kolkata',
    is_physical_space BOOLEAN DEFAULT FALSE,
    verification_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services taxonomy
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    description TEXT,
    base_price DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service options/add-ons
CREATE TABLE service_options (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id UUID REFERENCES services(id) NOT NULL,
    option_name TEXT NOT NULL,
    extra_cost DECIMAL(10,2) DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    description TEXT
);

-- Availability slots
CREATE TABLE availability_slots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    studio_id UUID REFERENCES studios(id) NOT NULL,
    slot_start TIMESTAMPTZ NOT NULL,
    slot_end TIMESTAMPTZ NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_id UUID REFERENCES profiles(id) NOT NULL,
    studio_id UUID REFERENCES studios(id) NOT NULL,
    service_id UUID REFERENCES services(id) NOT NULL,
    booking_options JSONB,
    total_amount DECIMAL(10,2),
    deposit_paid DECIMAL(10,2) DEFAULT 0,
    escrow_amount DECIMAL(10,2) DEFAULT 0,
    status TEXT DEFAULT 'pending',
    booked_range TSTZRANGE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) NOT NULL,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_locality ON profiles(base_locality);
CREATE INDEX idx_studios_city ON studios(city);
CREATE INDEX idx_availability_slots ON availability_slots(studio_id, slot_start, slot_end);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_bookings_studio ON bookings(studio_id);

-- Exclusion constraint to prevent double-booking
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE bookings ADD CONSTRAINT exclusion_double_booking 
EXCLUDE USING gist (studio_id WITH =, booked_range WITH &&);