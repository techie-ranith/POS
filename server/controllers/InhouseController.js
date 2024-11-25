const InhouseModel = require('../Models/InhouseModel');
const BaseController = require('./BaseController');

class InhouseController extends BaseController {
    constructor() {
        super(InhouseModel);
    }

    async getSingleInhouse(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.getSingleItem(id, res);
    }

    async getAllInhouses(req, res) {
        await this.getAllItems(req, res);
    }

    async createNewInhouse(req, res) {
        const data = req.body;
        await this.createNewItem(data, res);
    }

    async updateInhouse(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return; 
        }
        const data = req.body;
        await this.updateExistingItem(id, data, res);
    }

    async deleteSingleInhouse(req, res) {
        const id = req.params.id;
        if (!this.validateId(id, res)) {
            return;
        }
        await this.deleteSingleItem(id, res);
    }

    async deleteAllInhouses(req, res) {
        await this.deleteAllItems(req, res);
    }



}

module.exports = new InhouseController();
