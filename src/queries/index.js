const Query = {
  info: () => `Graphql server start`,
  getUser: (parent, args, context) => {
    const { userId } = context;
    return context.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
};

export default Query;
