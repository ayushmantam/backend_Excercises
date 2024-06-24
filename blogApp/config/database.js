const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

// Function to establish a connection with the MongoDB database
const connectWithDb = () => {
  // Connect to the database using the provided URL and options

  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true, // useNewUrlParser is deprecated, but you may still see warnings until you update the MongoDB driver
      useUnifiedTopology: true, // useUnifiedTopology is deprecated, but you may still see warnings until you update the MongoDB driver
    })

    // Successful connection handler
    .then(() => {
      console.log("DB connected successfully");
    })
    // Connection error handler
    .catch((error) => {
      console.log("DB facing Connection Issues");
      console.log(error);
      process.exit(1); // Exit the application with an error code if the connection fails
    });
};

// Export the connectWithDb function for use in other modules
module.exports = connectWithDb;
