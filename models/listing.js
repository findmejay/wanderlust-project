const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultImageURL = "https://images.unsplash.com/photo-1462400362591-9ca55235346a?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: String, 
    filename: String,
    
  },

  price: Number,

  location: String,

  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async(listing)=> {
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
