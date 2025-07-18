// In-memory users (could be replaced with a database later)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Controller to get all users
export const getUsers = (req, res) => {
  res.json(users);
};

// Controller to create a new user
export const createUser = (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
};
