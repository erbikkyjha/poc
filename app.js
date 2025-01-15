const express = require('express');
const bodyParser = require('body-parser');
const Booking = require('./model');
const { Op, Sequelize } = require('sequelize');

const app = express();
app.use(bodyParser.json());

// POST /bookings
app.post('/bookings', async (req, res) => {
    const { customer_name, booking_date, amount, vendor_details } = req.body;

    // Validate request body
    if (!customer_name || !booking_date || !amount || !booking_date) {
        return res.status(400).json({
            status: 'failure',
            errors: {
                customer_name : !customer_name ? 'Customer name is required.' : undefined,
                bookingDate: !booking_date ? 'Booking date is required.' : undefined,
                amount: !amount ? 'Amount is required.' : undefined,
                vendor_details: !vendor_details ? 'Vendor details are required.' : undefined,
            },
        });
    }

    try {
        const booking = await Booking.create({
            customer_name: customer_name,
            booking_date: booking_date,
            amount: amount,
            vendor_details: vendor_details
        });

        return res.status(201).json({
            status: 'success',
            message: 'Booking created successfully.',
            bookingId: booking.booking_id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'failure',
            message: 'An error occurred while creating the booking.',
        });
    }
});

// GET /bookings
app.get('/bookings', async (req, res) => {
    const { date, vendor } = req.query;

    const conditions = {};
    if (date) {
        conditions.booking_date = Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('booking_date')),
            date
        );
    }
    if (vendor) {
        conditions['vendor_details.vendor_name'] = vendor
    }

    try {
        const bookings = await Booking.findAll({
            where: conditions
        });

        return res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'failure',
            message: 'An error occurred while fetching bookings.',
        });
    }
});

// GET /bookings/:id
app.get('/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findOne({
            where: { booking_id: id }
        });

        if (!booking) {
            return res.status(404).json({
                status: 'failure',
                message: 'Booking not found.',
            });
        }

        return res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'failure',
            message: 'An error occurred while fetching the booking.',
        });
    }
});

// DELETE /bookings/:id
app.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Booking.destroy({
            where: { booking_id: id }
        });

        if (result === 0) {
            return res.status(404).json({
                status: 'failure',
                message: 'Booking not found.',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Booking deleted successfully.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'failure',
            message: 'An error occurred while deleting the booking.',
        });
    }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
