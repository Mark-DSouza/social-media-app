import { User } from "../entity/User";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
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
}
