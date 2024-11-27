const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crmSchema = new Schema({
  FullName: {
    type: String,
    required: true,
  },
  CheckInDate: {
    type: Date,
    required: true,
  },
  CheckOutDate: {
    type: Date,
    required: true,
  },
  RoomType: {
    type: String,
    required: true,
  },
  People: {
    type: Number,
    required: true,
  },
});

const crm = mongoose.model('crm', crmSchema);

module.exports = crm;
