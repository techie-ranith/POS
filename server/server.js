
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

// const Booking = require('./routes/BookingRoute');
// const AcceptedBooking = require('./routes/AcceptedBookingRoute');
// const Inhouse = require('./routes/InhouseRoute');
// const Room = require("./routes/RoomRoute");
// const Offer = require("./routes/OffersRoute");
// const Crm = require('./routes/CrmRoute');
// const Revenue = require('./routes/RevenueRoute');
const userRoutes = require('./routes/userRoutes');


const app = express();
const port = process.env.PORT  || 8080;

app.use(cors());
app.use(bodyParser.json());


app.use(express.json());
app.use(cors()); 

// app.use('/api/booking',Booking);
// app.use('/api/inhouse',Inhouse);
// app.use('/api/offer',Offer);
// app.use('/api/acceptedbooking',AcceptedBooking);
// app.use('/api/room',Room)
// app.use('/api/crm',Crm);
// app.use('/api/revenue',Revenue)
app.use('/api', userRoutes);


dotenv.config();
  app.listen(port, () => {
    console.log(`listning on port: ${port}`);
  });
