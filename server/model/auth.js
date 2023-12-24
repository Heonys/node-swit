const users = [];

/* 
id: '1'
name: 'Jiheon',
username: 'jiheon',
password: '$2b$12$.BXpgWB8ugdW2xFIkgW5ruN4LHq3ISraWcgFYXkMJxwspM/e8C54u',
email: 'siwmua99@gmail.com',
url: 'http://localhost:53',
*/

export async function fintByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(data) {
  const newUser = { id: Date.now().toString(), ...data };
  users.push(newUser);
  return newUser.id;
}
