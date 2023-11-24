// userController.js
const User = require('./modals/User');

async function createUser(email, password) {
  try {
    await User.create({
      email: email,
      password: password,
    });
    return { status: true, message: 'User created.' };
  } catch (error) {
    console.error(error);
    return { status: false, message: 'Server Error' };
  }
}

module.exports = { createUser, User };
