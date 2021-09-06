const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  animeList: {
    type: [String],
  },
  mangaList: {
    type: [String],
  },
});

module.exports = listSchema;
