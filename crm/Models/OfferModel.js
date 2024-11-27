const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;
