const express = require('express');
const router = express.Router();
const AcceptedBookingController = require('../controllers/AcceptedBookingController');

router.get('/:id', (req, res) => AcceptedBookingController.getSingleAcceptedBooking(req, res));
router.get('', (req, res) => AcceptedBookingController.getAllAcceptedBookings(req, res));
router.post('', (req, res) => AcceptedBookingController.createNewAcceptedBooking(req, res));
router.put('/:id', (req, res) => AcceptedBookingController.updateAcceptedBooking(req, res));
router.delete('/:id', (req, res) => AcceptedBookingController.deleteSingleAcceptedBooking(req, res));
router.delete('', (req, res) => AcceptedBookingController.deleteAllAcceptedBookings(req, res));

module.exports = router;
