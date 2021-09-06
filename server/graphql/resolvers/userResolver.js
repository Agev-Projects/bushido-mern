const User = require("../../models/users");

const userResolver = {
  Query: {
    user: (parent, args, { req }) => {
      if (!req.userId) {
        return null;
      }
      console.log(req.userId);
      return User.findOne({ _id: req.userId.id });
    },
  },
  Mutation: {
    changePic: (parent, { pic }, { req }) => {
      if (!req.userId) {
        return null;
      }
      console.log(req.userId);
      return User.findOneAndUpdate(
        { _id: req.userId.id },
        { profilePic: pic },
        { new: true }
      );
    },
  },
};

module.exports = { userResolver };
