const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');

router.get('/:id', (req, res) => BookingController.getSingleBooking(req, res));
router.get('', (req, res) => BookingController.getAllBookings(req, res));
router.post('', (req, res) => BookingController.createNewBooking(req, res));
router.put('/:id', (req, res) => BookingController.updateBooking(req, res));
router.delete('/:id', (req, res) => BookingController.deleteSingleBooking(req, res));
router.delete('', (req, res) => BookingController.deleteAllBookings(req, res));

module.exports = router;
