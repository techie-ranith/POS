const AcceptedBookingModel = require('../Models/AcceptedBookingModel');
const BaseController = require('./BaseController');

class AcceptedBookingController extends BaseController {
    constructor() {
        super(AcceptedBookingModel);
    }

    async getSingleAcceptedBooking(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }

    async getAllAcceptedBookings(req, res) {
        await this.getAllItems(req, res);
    }

    async createNewAcceptedBooking(req, res) {
        const data = req.body;
        await this.createNewItem(data, res);
    }

    async updateAcceptedBooking(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return; 
        }
        const data = req.body;
        await this.updateExistingItem(id, data, res);
    }

    async deleteSingleAcceptedBooking(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.deleteSingleItem(id, res);
    }

    async deleteAllAcceptedBookings(req, res) {
        await this.deleteAllItems(req, res);
    }
}


module.exports = new AcceptedBookingController();
