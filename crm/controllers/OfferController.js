const OfferModel = require('../Models/OfferModel');
const BaseController = require('./BaseController');

class OfferController extends BaseController {
    constructor() {
        super(OfferModel);
    }

    async getSingleOffer(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        this.getSingleItem(id, res);
    }

    async getAllOffers(req, res) {
        this.getAllItems(req, res);
    }

    async createNewOffer(req, res) {
        const data = req.body;
        this.createNewItem(data, res);
    }

    async updateOffer(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        const data = req.body;
        this.updateExistingItem(id, data, res);
    }

    async deleteSingleOffer(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        this.deleteSingleItem(id, res);
    }

    async deleteAllOffers(req, res) {
        this.deleteAllItems(req, res);
    }
}

module.exports = new OfferController();
