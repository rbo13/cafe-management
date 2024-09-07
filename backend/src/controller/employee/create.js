function generateEmployeeId(size) {
  const prefix = 'UI'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = prefix

  for (let i = 0; i < size; i++) {
    const randomIndex = randomInt(0, characters.length);
    id += characters[randomIndex];
  }

  return id
}