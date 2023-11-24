
const { createUser } = require('./userController');
const User = require('./modals/User');  // Make sure this line is correct


// Mocking the User model for testing purposes
jest.mock('./modals/User', () => ({
  create: jest.fn(),
}));

test('creates a user with valid data', async () => {
  const email = 'test@example.com';
  const password = 'password123';

  // Mocking the behavior of the User.create method
  const mockUserCreate = User.create.mockResolvedValueOnce({});
  
  const result = await createUser(email, password);

  expect(mockUserCreate).toHaveBeenCalledWith({
    email: email,
    password: password,
  });

  expect(result.status).toBe(true);
  expect(result.message).toBe('User created.');
});

test('handles server error during user creation', async () => {
  const email = 'test@example.com';
  const password = 'password123';

  // Mocking the behavior of the User.create method to throw an error
  const mockUserCreate = User.create.mockRejectedValueOnce(new Error('Some error'));

  const result = await createUser(email, password);

  expect(mockUserCreate).toHaveBeenCalledWith({
    email: email,
    password: password,
  });

  expect(result.status).toBe(false);
  expect(result.message).toBe('Server Error');
});
