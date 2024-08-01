const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

async function routes(fastify, options) {
  // Public routes
  fastify.post('/register', authController.register);
  fastify.post('/login', authController.login);

  // Protected routes (use a preHandler hook for JWT validation)
  fastify.get('/user/:id', { preHandler: [fastify.verifyJWT] }, userController.getUserById);
}

module.exports = routes;
