const Animes = require("../../models/animes.js");

const animeResolver = {
  Query: {
    animes: () => Animes.find(),
    animes_hero: () =>
      Animes.find({
        "titles.en": { $in: ["One Piece", "Samurai Champloo", "Kill la Kill"] },
      }),
    anime_slug: (parent, { slug }, ctx) => Animes.findOne({ slug }),
    anime_search: (parent, { anime }, ctx) => {
      return Animes.find()
        .or([
          { "titles.en": anime },
          { "titles.es": anime },
          { "titles.pt": anime },
        ])
        .then((animes) => {
          return animes;
        })
        .catch((error) => console.log(error));
    },
    anime_genre: (parent, { genre }, ctx) => {
      return Animes.find({ "genres.en": genre }, (err, anime) => {
        return anime;
      });
    },
  },
};

module.exports = { animeResolver };
