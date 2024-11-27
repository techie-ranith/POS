// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Booking = require('./routes/BookingRoute');
const AcceptedBooking = require('./routes/AcceptedBookingRoute');
const Inhouse = require('./routes/InhouseRoute');
const Room = require("./routes/RoomRoute");
const Offer = require("./routes/OffersRoute");
const Crm = require('./routes/CrmRoute');
// const Revenue = require('./routes/RevenueRoute');


dotenv.config({ path: '.env' })
const app = express();
app.use(cors());
const port = process.env.PORT  || 8080;


app.use(express.json());
app.use(cors(
  {
    origin: [''],
    methods: ["POST","GET"],
    credentials: ''
  }
));

app.use('/api/booking',Booking);
app.use('/api/inhouse',Inhouse);
app.use('/api/offer',Offer);
app.use('/api/acceptedbooking',AcceptedBooking);
app.use('/api/room',Room)
app.use('/api/crm',Crm);
// app.use('/api/revenue',Revenue)



mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`Connected to DB & listning on port: ${port}`);
  });
})
.catch((error) => {
  console.log(error);
})

