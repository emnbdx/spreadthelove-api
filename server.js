const express = require("express");
const cors = require("cors");
var eventRouter = require('./routes/event');
var indexRouter = require('./routes/index');
var messageRouter = require('./routes/message');
var receiverRouter = require('./routes/receiver');
var userRouter = require('./routes/user');

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use('/api/events', eventRouter);
app.use('/', indexRouter);
app.use('/api/messages', messageRouter);
app.use('/api/receivers', receiverRouter);
app.use('/api/users', userRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});