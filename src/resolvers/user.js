const User = {
  transactions: (parent, args, context) => {
    return context.prisma.transaction
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .transactions();
  },
  stocks: (parent, args, context) => {
    return context.prisma.stock
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .stocks();
  },
};
export default User;
