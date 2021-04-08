import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import PointingService from "./pointing/pointing-service";
import RetroService from "./retro/retro-service";
import { ApolloServer } from "apollo-server-express";
import { getApolloConfig } from "./graphql";
import { connect } from "mongoose";
import config from "./config";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { UserModel } from "./models/user.model";
import utils from "./graphql/utils";

const startServer = async () => {
  await connect(
    config.dbConnection!,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const app = express();
  app.use(cookieParser());
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))
  if (!config.isDev) {
    app.use(express.static(path.resolve(__dirname, 'frontend')))
    app.get('*', (_req, res, _next) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
    })
  }
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, config.refreshTokenSecret);
      console.log(payload);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid
    const user = await UserModel.findOne({ _id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }
    utils.sendRefreshToken(res, user);
    return res.send({ ok: true, accessToken: utils.generateAccessToken(user) });
  });

  const apolloServer = new ApolloServer(await getApolloConfig());
  apolloServer.applyMiddleware({ app, cors: false });

  const server = http.createServer(app);

  new PointingService(server);
  new RetroService(server);

  server.listen(config.port, () =>
    console.log(`Listening on port ${config.port}`)
  );
};

startServer();
