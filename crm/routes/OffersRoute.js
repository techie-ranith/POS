const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/OfferController');

router.get('/:id', (req, res) => OfferController.getSingleOffer(req, res));
router.get('', (req, res) => OfferController.getAllOffers(req, res));
router.post('', (req, res) => OfferController.createNewOffer(req, res));
router.put('/:id', (req, res) => OfferController.updateOffer(req, res));
router.delete('/:id', (req, res) => OfferController.deleteSingleOffer(req, res));
router.delete('', (req, res) => OfferController.deleteAllOffers(req, res));

module.exports = router;
