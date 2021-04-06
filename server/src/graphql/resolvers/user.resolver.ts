import { User, UserModel } from "../../models/user.model";
import utils from "../utils";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware
} from "type-graphql";
import { MyContext } from "../MyContext";
import { isAuth } from "../middleware/isAuth";
import { verify } from "jsonwebtoken";
import config from "../../config";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken?: string;
  @Field(_type => User)
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(_returns => String)
  hello() {
    return "Hi";
  }

  @Query(_returns => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `Your user id is: ${payload!.userId}`;
  }

  @Query(_returns => [User])
  async users() {
    try {
      return UserModel.find();
    } catch (error) {
      throw error;
    }
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      console.log("Not Authenticated");
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, config.accessTokenSecret);
      return UserModel.findOne({ _id: payload.userId });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(_returns => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("User already Exists");
      } else {
        const newUser = new UserModel({
          email,
          password
        });
        await newUser.hashPassword(password);
        await newUser.save();
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  @Mutation(_returns => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User does not Exists");
      }
      if (!(await user.isPasswordValid(password))) {
        throw new Error("Password is incorrect");
      }
      // login successfully
      utils.sendRefreshToken(res, user);
      return {
        accessToken: utils.generateAccessToken(user),
        user
      };
    } catch (err) {
      throw err;
    }
  }

  @Mutation(_returns => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    utils.clearRefreshToken(res);
    return true;
  }
}
