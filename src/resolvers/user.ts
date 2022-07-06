import { User } from "../entity/User";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors: FieldError[] | null;

  @Field(() => User, { nullable: true })
  user: User | null;
}

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput
  ): Promise<User> {
    const user = User.create({
      username: options.username,
      password: await argon2.hash(options.password),
    });

    await user.save();
    return user;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username: options.username } });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist",
          },
        ],
        user: null,
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
        user: null,
      };
    }

    return {
      errors: null,
      user,
    };
  }
}
