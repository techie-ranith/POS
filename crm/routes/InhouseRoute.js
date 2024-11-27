const express = require('express');
const router = express.Router();
const InhouseController = require('../controllers/InhouseController');

router.get('/:id', (req, res) => InhouseController.getSingleInhouse(req, res));
router.get('', (req, res) => InhouseController.getAllInhouses(req, res));
router.post('', (req, res) => InhouseController.createNewInhouse(req, res));
router.put('/:id', (req, res) => InhouseController.updateInhouse(req, res));
router.delete('/:id', (req, res) => InhouseController.deleteSingleInhouse(req, res));
router.delete('', (req, res) => InhouseController.deleteAllInhouses(req, res));

module.exports = router;
