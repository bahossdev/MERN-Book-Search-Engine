const { User, Book } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
    books: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const book = await Book.create(args);
      return book;
    },
    createVote: async (parent, { _id, userNum }) => {
      const vote = await Book.findOneAndUpdate(
        { _id },
        { $inc: { [`user${userNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
