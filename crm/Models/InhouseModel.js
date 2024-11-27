const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inhouseSchema = new Schema({
  Name: {
    type: String,
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
  CheckInDate: {
    type: Date,
    required: true,
  },
  CheckOutDate: {
    type: Date,
    required: true,
  },
  CheckoutTime: {
    type: String,
    required: true,
  },
  FlightNumber: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Inhouse = mongoose.model('Inhouse', inhouseSchema);

module.exports = Inhouse;
