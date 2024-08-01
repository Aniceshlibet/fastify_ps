const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (request, reply) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    reply.send({ message: "User registered successfully", user });
  } catch (err) {
    reply.send(err);
  }
};

exports.login = async (request, reply) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return reply.status(401).send({ message: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return reply.status(401).send({ message: "Invalid password" });
    }
    const token = fastify.jwt.sign({ id: user.id, username: user.username });
    reply.send({ message: "Login successful", token });
  } catch (err) {
    reply.send(err);
  }
};
