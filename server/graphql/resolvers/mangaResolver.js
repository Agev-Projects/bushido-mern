const Mangas = require("../../models/mangas");

const mangaResolver = {
  Query: {
    mangas: () => Mangas.find(),
    mangas_hero: () =>
      Mangas.find({
        "titles.en": { $in: ["Vagabond", "Naruto", "One Piece"] },
      }),
    manga_search: (parent, { manga }, ctx) => {
      return Mangas.find()
        .or([
          { "titles.en": manga },
          { "titles.es": manga },
          { "titles.pt": manga },
        ])
        .then((mangas) => {
          return mangas;
        })
        .catch((error) => console.log(error));
    },
    manga_slug: (parent, { slug }, ctx) => Mangas.findOne({ slug }),
    manga_genre: (parent, { genre }, ctx) => {
      return Mangas.find({ "genres.en": genre }, (err, manga) => {
        return manga;
      });
    },
  },
};
module.exports = { mangaResolver };
