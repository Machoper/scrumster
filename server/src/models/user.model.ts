import {
  DocumentType,
  getModelForClass,
  prop as Property
} from "@typegoose/typegoose";
import { compare, hash } from "bcryptjs";
import { Field as GqlField, ObjectType as GqlType } from "type-graphql";

@GqlType()
export class User {
  @GqlField(_type => String)
  readonly id!: string;

  @GqlField(_type => String)
  @Property({ required: true, unique: true })
  email!: string;

  @GqlField(_type => String)
  @Property({ required: true })
  password!: string;

  async hashPassword(this: DocumentType<User>, password: string) {
    const hashedPassword = await hash(password, 12);
    this.password = hashedPassword;
  }

  async isPasswordValid(this: DocumentType<User>, password: string) {
    return compare(password, this.password);
  }
}

export const UserModel = getModelForClass(User);
