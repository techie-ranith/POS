const BookingModel = require('../Models/BookingModel');
const BaseController = require('./BaseController');

class BookingController extends BaseController {
    constructor() {
        super(BookingModel);
    }

    async getSingleBooking(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }

    async getAllBookings(req, res) {
        await this.getAllItems(req, res);
    }

    async createNewBooking(req, res) {
        const data = req.body;
        await this.createNewItem(data, res);
    }

    async updateBooking(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return; 
        }
        const data = req.body;
        await this.updateExistingItem(id, data, res);
    }

    async deleteSingleBooking(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.deleteSingleItem(id, res);
    }

    async deleteAllBookings(req, res) {
        await this.deleteAllItems(req, res);
    }
}

module.exports = new BookingController();
