const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');

const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.count({}),

    authorCount: async () => await Author.count({}),

    allBooks: async (root, args) => {
      let filtered = await Book.find({}).populate('author');
      // if (args.author) filtered = filtered.filter((b) => b.author === args.author);
      if (args.genre) filtered = filtered.filter((b) => b.genres.includes(args.genre));
      return filtered;
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      const final = await Promise.all(authors.map(async (aut) => {
        const bookCount = await Book.count({ author: aut._id });
        aut.bookCount = bookCount;
        return aut;
      }));
      return final;
      /*
      // Por unica vez, agrego con este query los array a la DB:
      authors.forEach((aut) => {
        const newAuthor = new Author(aut);
        newAuthor.save().then((r) => {
          console.log('saved:', r);
        })
      })
      books.forEach((book) => {
        Author.findOne({ name: book.author }).then((aut) => {
          const newBook = new Book({ ...book, author: aut._id });
          newBook.save().then((r) => {
            console.log('saved:', r);
          })
        })
      })
      */
    },

    me: async (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        // Si no se inicio sesion (es decir, si la solicitud no lleva el header auth adecuado):
        throw new AuthenticationError('Usuario no autenticado')
      }
      let author = await Author.findOne({ name: args.author });
      let result  = {};
      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          author = await newAuthor.save();
        }
        const newBook = new Book({ ...args, author: author.id });
        result = await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      const spreadResult = {...result};
      const returnedValue = spreadResult._doc;
      returnedValue.author = author;
      console.log(returnedValue);
      pubsub.publish('BOOK_ADDED', { bookAdded: returnedValue });
      return returnedValue;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Usuario no autenticado')
      }
      const editedAuthor = await Author.findOneAndUpdate({ name: args.name}, { born: args.setBornTo } );
      return editedAuthor;
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message, { invalidArgs: args })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if(!user || args.password !== '123456') {
        throw new UserInputError('Credenciales incorrectas.')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
