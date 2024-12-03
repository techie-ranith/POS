const express = require('express');
const router = express.Router();
const RevenueController = require('../controllers/revenueController');

router.get('/:id', (req, res) => RevenueController.getSingleRevenue(req, res));
router.get('', (req, res) => RevenueController.getAllRevenues(req, res));
router.post('', (req, res) => RevenueController.createNewRevenue(req, res));
router.put('/:id', (req, res) => RevenueController.updateRevenue(req, res));
router.delete('/:id', (req, res) => RevenueController.deleteSingleRevenue(req, res));
router.delete('', (req, res) => RevenueController.deleteAllRevenues(req, res));

module.exports = router;
