-- 1. Create booking with dummy deposit payment
CREATE OR REPLACE FUNCTION create_booking_with_dummy_deposit(
    p_client_id UUID,
    p_studio_id UUID,
    p_service_id UUID,
    p_booked_range TSTZRANGE,
    p_booking_options JSONB,
    p_total_amount DECIMAL,
    p_deposit_amount DECIMAL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_booking_id UUID;
    v_dummy_order_id TEXT;
    v_dummy_payment_id TEXT;
BEGIN
    -- Check for overlapping bookings
    IF EXISTS (
        SELECT 1 FROM bookings 
        WHERE studio_id = p_studio_id 
        AND booked_range && p_booked_range
        AND status IN ('pending', 'accepted', 'confirmed')
    ) THEN
        RAISE EXCEPTION 'Time slot not available';
    END IF;

    -- Generate dummy payment IDs
    v_dummy_order_id := 'dummy_order_' || replace(cast(gen_random_uuid() as text), '-', '');
    v_dummy_payment_id := 'dummy_pay_' || replace(cast(gen_random_uuid() as text), '-', '');

    -- Insert booking
    INSERT INTO bookings (
        client_id,
        studio_id,
        service_id,
        booking_options,
        total_amount,
        deposit_paid,
        booked_range,
        status
    ) VALUES (
        p_client_id,
        p_studio_id,
        p_service_id,
        p_booking_options,
        p_total_amount,
        p_deposit_amount,  -- Mark deposit as paid in dummy system
        p_booked_range,
        'pending'
    ) RETURNING id INTO v_booking_id;

    -- Create payment record (marked as completed in dummy system)
    INSERT INTO payments (
        booking_id,
        razorpay_order_id,
        razorpay_payment_id,
        amount,
        status,
        payment_method
    ) VALUES (
        v_booking_id,
        v_dummy_order_id,
        v_dummy_payment_id,
        p_deposit_amount,
        'completed',  -- Directly completed in dummy system
        'dummy_online'
    );

    -- Return booking and payment info
    RETURN json_build_object(
        'booking_id', v_booking_id,
        'order_id', v_dummy_order_id,
        'payment_id', v_dummy_payment_id,
        'status', 'success',
        'message', 'Dummy payment completed successfully'
    );
END;
$$;

-- 2. Dummy payment verification (simulates webhook)
CREATE OR REPLACE FUNCTION verify_dummy_payment(
    p_booking_id UUID,
    p_dummy_signature TEXT DEFAULT 'dummy_signature_verified'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- In dummy system, all payments are automatically verified
    UPDATE payments 
    SET status = 'completed',
        verified_at = NOW()
    WHERE booking_id = p_booking_id;
    
    UPDATE bookings 
    SET status = 'payment_verified'
    WHERE id = p_booking_id;
    
    RETURN TRUE;
END;
$$;

-- 3. Studio accepts booking (dummy version)
CREATE OR REPLACE FUNCTION studio_accept_booking_dummy(
    p_booking_id UUID,
    p_studio_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_booking_record bookings%ROWTYPE;
    v_escrow_amount DECIMAL;
BEGIN
    -- Get booking details and verify ownership
    SELECT * INTO v_booking_record 
    FROM bookings 
    WHERE id = p_booking_id 
    AND studio_id = p_studio_id
    AND status = 'payment_verified';
    
    IF v_booking_record.id IS NULL THEN
        RETURN json_build_object('success', false, 'message', 'Booking not found or not verified');
    END IF;

    -- Calculate escrow amount (25% of remaining balance in escrow mode)
    IF current_setting('app.payment_mode', true) = 'escrow' THEN
        v_escrow_amount := (v_booking_record.total_amount - v_booking_record.deposit_paid) * 0.25;
    ELSE
        v_escrow_amount := 0;  -- Deposit-only mode
    END IF;

    -- Update booking status
    UPDATE bookings 
    SET 
        status = 'accepted',
        escrow_amount = v_escrow_amount,
        accepted_at = NOW()
    WHERE id = p_booking_id;

    -- Create dummy notification
    INSERT INTO notifications (user_id, title, message, type)
    VALUES (
        v_booking_record.client_id,
        'Booking Accepted!',
        'Your booking has been accepted by the studio. ' || 
        CASE WHEN v_escrow_amount > 0 
            THEN 'Please pay the remaining amount to confirm.'
            ELSE 'Your booking is now confirmed!'
        END,
        'booking_update'
    );

    RETURN json_build_object(
        'success', true,
        'message', 'Booking accepted successfully',
        'escrow_amount', v_escrow_amount,
        'next_step', CASE WHEN v_escrow_amount > 0 THEN 'awaiting_escrow' ELSE 'confirmed' END
    );
END;
$$;

-- 4. Dummy WhatsApp notification simulation
CREATE OR REPLACE FUNCTION send_dummy_whatsapp_notification(
    p_phone TEXT,
    p_template_name TEXT,
    p_parameters JSONB
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Simulate WhatsApp message sending
    RAISE NOTICE 'WHATSAPP SIMULATION: Sending % to % with parameters %', 
        p_template_name, p_phone, p_parameters;
    
    RETURN json_build_object(
        'success', true,
        'message_id', 'dummy_wa_' || replace(cast(gen_random_uuid() as text), '-', ''),
        'status', 'sent',
        'note', 'This is a dummy WhatsApp simulation'
    );
END;
$$;