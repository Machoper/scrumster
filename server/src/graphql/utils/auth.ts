import { Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { User } from "../../models/user.model";

const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.accessTokenSecret!, {
    expiresIn: "1h"
  });
};

const generateRefreshToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.refreshTokenSecret, {
    expiresIn: "7d"
  });
};

const sendRefreshToken = (res: Response, user: User) => {
  res.cookie("jid", generateRefreshToken(user), { httpOnly: true });
};

const clearRefreshToken = (res: Response) => {
  res.cookie("jid", "", { httpOnly: true });
};

export default {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  clearRefreshToken
};
