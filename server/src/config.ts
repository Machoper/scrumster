import dotenv from "dotenv";

dotenv.config();
export default {
    port: process.env.PORT!,
    dbConnection: process.env.DB_CONNECTION!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!
}