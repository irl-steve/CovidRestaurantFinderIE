const express = require('express'); //import express framework
const app = express(); //sets up app as an express app
const port = process.env.PORT || 3000; //the server will listen on port 3000, or a user defined port
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //imports the bodyparse
const cors = require('cors'); //imports machinery for CORS handling

const restRoutes = require('C:/Users/Stephen/Documents/Side Projects/restaurant-listing/backend/routes/restaurant_routes.js');
const userRoutes = require('C:/Users/Stephen/Documents/Side Projects/restaurant-listing/backend/routes/user_routes.js');

var dbConfig = require('C:/Users/Stephen/Documents/Side Projects/restaurant-listing/backend/databases/main_db.js');

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.Promise = global.Promise; //lets mongoose use promises, that is an object that may produce a single value some time in the future : either a resolved value, or a reason that it's not resolved (e.g., a network error occurred)


// parse requests of content-type - application/x-www-form-urlencoded, this means that we can send form data as a request
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json, this means that we can send json data as a request
app.use(bodyParser.json());
//uses the imported cors module to handle cors errors if they occur
app.use(cors());

app.use("/restaurants", restRoutes);
// app.use("/users", userRoutes);

//sets up a general message that is printed when a 404 eroor occurs
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//all other errors fall under this category, will return a 500 unless specified
//, also means that if none of the endpoints are reached, that is if an undefined HTTP request is received than an error will occur
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


//ap.use()

//const userRouter = require()(app);
//sets up the server to listen on port
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
});
