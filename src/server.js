require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const routes = require('./routes');
const { sequelize } = require('./config/database'); // Adjust the path if necessary

// JWT setup
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET,
});

// Authentication hook
fastify.decorate("verifyJWT", async function(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register routes
fastify.register(routes, { prefix: '/api' });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
