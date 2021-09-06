const User = require("../../models/users.js");
const Animes = require("../../models/animes.js");
const Mangas = require("../../models/mangas");

const listResolver = {
  Query: {
    animelist: async (parent, args, { req }) => {
      if (!req.userId) {
        return null;
      }
      try {
        const user = await User.findOne({ _id: req.userId.id });
        const list = user.list.animeList;
        let AnimeList = await Animes.find({ _id: { $in: list } });
        return AnimeList;
      } catch {}
    },
    mangalist: async (parent, args, { req }) => {
      if (!req.userId) {
        return null;
      }
      try {
        const user = await User.findOne({ _id: req.userId.id });
        const list = user.list.mangaList;
        let MangaList = await Mangas.find({ _id: { $in: list } });
        return MangaList;
      } catch {}
    },
  },
  Mutation: {
    addAnime: async (parent, { id }, { req }) => {
      try {
        await User.updateOne(
          { _id: req.userId.id },
          { $push: { "list.animeList": id } }
        );
        return id;
      } catch {}
    },
    addManga: async (parent, { id }, { req }) => {
      try {
        await User.updateOne(
          { _id: req.userId.id },
          { $push: { "list.mangaList": id } }
        );
        return id;
      } catch {}
    },
    removeAnime: async (parent, { id }, { req }) => {
      try {
        await User.updateOne(
          { _id: req.userId.id },
          { $pull: { "list.animeList": id } }
        );

        return id;
      } catch {}
    },
    removeManga: async (parent, { id }, { req }) => {
      try {
        await User.updateOne(
          { _id: req.userId.id },
          { $pull: { "list.mangaList": id } }
        );

        return id;
      } catch {}
    },
  },
};

module.exports = { listResolver };
