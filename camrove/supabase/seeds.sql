-- Insert sample profiles
INSERT INTO profiles (id, display_name, role, experience_level, base_locality, pricing_tier) VALUES
-- Studios
('11111111-1111-1111-1111-111111111111', 'Pixel Perfect Studios', 'studio', '7-10', 'south_kolkata', 'premium'),
('22222222-2222-2222-2222-222222222222', 'Kolkata Wedding Films', 'studio', '10+', 'entire_kolkata', 'luxury'),
('33333333-3333-3333-3333-333333333333', 'Creative Lens Agency', 'agency', '3-7', 'salt_lake', 'mid'),
('44444444-4444-4444-4444-444444444444', 'Portrait Masters', 'studio', '5-8', 'north_kolkata', 'premium'),

-- Freelancers  
('55555555-5555-5555-5555-555555555555', 'Amit Sharma', 'freelancer', '3-5', 'south_kolkata', 'budget'),
('66666666-6666-6666-6666-666666666666', 'Priya Patel', 'freelancer', '1-3', 'new_town', 'mid'),
('77777777-7777-7777-7777-777777777777', 'Rajiv Mehta', 'freelancer', '7-10', 'salt_lake', 'premium'),

-- Clients
('88888888-8888-8888-8888-888888888888', 'Rahul Verma', 'client', NULL, 'howrah', NULL),
('99999999-9999-9999-9999-999999999999', 'Simran Kaur', 'client', NULL, 'south_kolkata', NULL);

-- Insert studios
INSERT INTO studios (id, profile_id, studio_name, description, locality, is_physical_space, verification_status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Pixel Perfect Studios', 'Professional photography studio specializing in weddings and corporate events', 'south_kolkata', true, 'verified'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Kolkata Wedding Films', 'Award-winning wedding cinematography team serving all of Kolkata', 'entire_kolkata', false, 'verified'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Creative Lens Agency', 'Full-service creative agency for photography and videography', 'salt_lake', true, 'pending'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 'Portrait Masters', 'Specialists in portrait and fashion photography', 'north_kolkata', true, 'verified');

-- Insert services
INSERT INTO services (id, name, category, subcategory, base_price) VALUES
-- Wedding Photography
('s1111111-1111-1111-1111-111111111111', 'Pre-Wedding Shoot', 'photography', 'wedding', 15000),
('s2222222-2222-2222-2222-222222222222', 'Wedding Day Coverage', 'photography', 'wedding', 30000),
('s3333333-3333-3333-3333-333333333333', 'Cinematic Wedding', 'photography', 'wedding', 50000),

-- Portrait Photography
('s4444444-4444-4444-4444-444444444444', 'Individual Portraits', 'photography', 'portrait', 5000),
('s5555555-5555-5555-5555-555555555555', 'Family Portraits', 'photography', 'portrait', 8000),

-- Wedding Videography
('s6666666-6666-6666-6666-666666666666', 'Wedding Highlight Film', 'videography', 'wedding', 40000),
('s7777777-7777-7777-7777-777777777777', 'Full Day Coverage', 'videography', 'wedding', 60000),

-- Editing Services
('s8888888-8888-8888-8888-888888888888', 'Basic Photo Editing', 'editing', 'photo_editing', 500),
('s9999999-9999-9999-9999-999999999999', 'Advanced Video Edit', 'editing', 'video_editing', 15000);

-- Insert service options/add-ons
INSERT INTO service_options (id, service_id, option_name, extra_cost, is_default, description) VALUES
-- Wedding photography add-ons
('o1111111-1111-1111-1111-111111111111', 's2222222-2222-2222-2222-222222222222', 'Second Photographer', 10000, false, 'Additional photographer for better coverage'),
('o2222222-2222-2222-2222-222222222222', 's2222222-2222-2222-2222-222222222222', 'Drone Coverage', 8000, false, 'Aerial shots of the venue'),
('o3333333-3333-3333-3333-333333333333', 's2222222-2222-2222-2222-222222222222', 'Photo Album', 5000, false, 'Premium printed photo album'),

-- Video editing add-ons
('o4444444-4444-4444-4444-444444444444', 's9999999-9999-9999-9999-999999999999', 'Color Grading', 3000, false, 'Professional color correction'),
('o5555555-5555-5555-5555-555555555555', 's9999999-9999-9999-9999-999999999999', 'Motion Graphics', 5000, false, 'Animated titles and graphics');

-- Insert availability slots for next week
INSERT INTO availability_slots (id, studio_id, slot_start, slot_end, is_available) VALUES
-- Studio 1 slots
('a1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2024-01-15 09:00:00+05:30', '2024-01-15 12:00:00+05:30', true),
('a2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2024-01-15 14:00:00+05:30', '2024-01-15 17:00:00+05:30', true),
('a3333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2024-01-16 10:00:00+05:30', '2024-01-16 13:00:00+05:30', true),

-- Studio 2 slots  
('a4444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2024-01-15 08:00:00+05:30', '2024-01-15 11:00:00+05:30', true),
('a5555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2024-01-16 15:00:00+05:30', '2024-01-16 18:00:00+05:30', true);

-- Insert sample bookings
INSERT INTO bookings (id, client_id, studio_id, service_id, total_amount, deposit_paid, status, booked_range) VALUES
('b1111111-1111-1111-1111-111111111111', '88888888-8888-8888-8888-888888888888', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 's2222222-2222-2222-2222-222222222222', 30000, 999, 'accepted', '[2024-01-10 09:00:00+05:30, 2024-01-10 17:00:00+05:30)'),
('b2222222-2222-2222-2222-222222222222', '99999999-9999-9999-9999-999999999999', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 's6666666-6666-6666-6666-666666666666', 40000, 999, 'completed', '[2024-01-08 10:00:00+05:30, 2024-01-08 16:00:00+05:30)');