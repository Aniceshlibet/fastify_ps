const { User } = require('../models');

exports.getUserById = async (request, reply) => {
  try {
    const user = await User.findByPk(request.params.id, { attributes: ['id', 'username', 'email'] });
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }
    reply.send(user);
  } catch (err) {
    reply.send(err);
  }
};
