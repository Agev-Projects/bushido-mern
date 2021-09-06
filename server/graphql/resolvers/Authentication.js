const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const SECRET_KEY = process.env.SECRET_KEY;
const MAX_AGE = 7 * 24 * 60 * 60;

//Handlers & Token
const handleSignUpErrors = (error) => {
  console.log(error.message, error.code);
  let errors = {
    username: "",
    email: "",
    password: "",
    profilePic: "",
  };

  //duplicate error
  if (error.code === 11000 && error.message.includes("username")) {
    errors.username = `Error: That username already exists`;
    return errors;
  }
  if (error.code === 11000 && error.message.includes("email")) {
    errors.email = `Error: That email already exists`;
    return errors;
  }

  //Validation errors
  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const handleLoginErrors = (error) => {
  console.log(error.message, error.code);
  let errors = {
    email: "",
    password: "",
  };

  //Login Errors
  if (error.message === "Error: Incorrect Email") {
    errors.email = error.message;
  }

  if (error.message === "Error: Incorrect Password") {
    errors.password = error.message;
  }

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "7d",
  });
};

//Resolver

const authResolver = {
  Mutation: {
    signup: async (
      parent,
      { username, email, password, profilePic },
      { res }
    ) => {
      try {
        const user = await User.create({
          username,
          email,
          password,
          profilePic,
        });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
        return user;
      } catch (error) {
        const errors = handleSignUpErrors(error);
        return errors;
      }
    },
    login: async (parent, { email, password }, { res }) => {
      try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
        return user;
      } catch (error) {
        const errors = handleLoginErrors(error);
        return errors;
      }
    },
    logout: async (parent, args, { res }) => {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 1 });
      return true;
    },
  },
};

module.exports = { authResolver };
