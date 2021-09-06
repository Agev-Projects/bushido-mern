const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeSchema = new Schema({
  titles: {
    en: { type: String, required: true },
    es: { type: String, required: true },
    pt: { type: String, required: true },
  },
  descriptions: {
    en: { type: String, required: true },
    es: { type: String, required: true },
    pt: { type: String, required: true },
  },
  imageTitle: {
    type: String,
  },
  imageHero: {
    type: String,
  },
  imageCover: {
    type: String,
  },
  trailer: {
    type: String,
  },
  trailerImage: {
    type: String,
  },
  genres: {
    en: { type: [String], required: true },
    es: { type: [String], required: true },
    pt: { type: [String], required: true },
  },
  slug: {
    type: String,
  },
});

module.exports = mongoose.model("Anime", animeSchema);
