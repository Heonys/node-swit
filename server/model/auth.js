const users = [];

export async function fintByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(data) {
  const newUser = { ...data, id: "1" };
  users.push(newUser);
  console.log(users);
  return newUser.id;
}
