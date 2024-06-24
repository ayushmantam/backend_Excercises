//import mongoose
const mongoose = require("mongoose");

//route handler
const likeSchema = new mongoose.Schema({
  //konsi post par like kar rha hai
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", //reference to the post model
  },
  //kon like kar rha hai
  user: {
    type: String,
    required: true,
  },
});

//exports
module.exports = mongoose.model("Like", likeSchema);
