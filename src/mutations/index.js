import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { APP_SECRET } from "../utils/utils.js";
const Mutation = {
  subscription: async (parent, args, context, info) => {
    const subscribe = await context.prisma.subscription.create({
      data: {
        email: args.email,
      },
    });
    return subscribe;
  },
  signup: async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
      data: { ...args, password },
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  },
  login: async (parent, args, context, info) => {
    const user = await context.prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  },
};

export default Mutation;
