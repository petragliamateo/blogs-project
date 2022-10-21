const jwt = require('jsonwebtoken');
const User = require('../models/user')

const context = async ({ req }) => {
  // context salta en todas las consultas, y se puede analizar el request con el header authorization
  // Por lo tanto para cada query o mutacion se va a llamar esta funcion.
  console.log('context');
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
}

module.exports = context;
