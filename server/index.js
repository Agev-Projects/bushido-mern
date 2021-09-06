//Servers and DB
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

//Libraries
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { merge } = require("lodash");
const morgan = require("morgan");

//GraphQL typeDefs, resolvers.
const { typeUser } = require("./graphql/schema/typeUser.js");
const { typeAnime } = require("./graphql/schema/typeAnime.js");
const { typeManga } = require("./graphql/schema/typeManga.js");
const { typeList } = require("./graphql/schema/typeList.js");
const { authResolver } = require("./graphql/resolvers/Authentication.js");
const { userResolver } = require("./graphql/resolvers/userResolver.js");
const { animeResolver } = require("./graphql/resolvers/animeResolver.js");
const { mangaResolver } = require("./graphql/resolvers/mangaResolver.js");
const { listResolver } = require("./graphql/resolvers/listResolver.js");

//Middleware
const { requireAuth } = require("./middlewares/authMiddleware.js");

//New Apollo Server
const server = new ApolloServer({
  typeDefs: [typeUser, typeAnime, typeManga, typeList],
  resolvers: merge(
    authResolver,
    userResolver,
    animeResolver,
    mangaResolver,
    listResolver
  ),
  context: ({ req, res }) => ({ req, res }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
const app = express();
//Connect to DB and start server
const PORT = process.env.PORT;
const URL = process.env.CONNECT_URL;
const ORIGIN_URL = process.env.ORIGIN_URL;
const corsOptions = {
  origin: ORIGIN_URL,
  credentials: true,
};
app.use(cors(corsOptions));

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(async () => {
    console.log("Connected to database");
    await server.start();
    server.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
      console.log("Server Running on PORT: ", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(requireAuth);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/graphql");
});
