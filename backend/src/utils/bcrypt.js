export const hashPassword = async (password) => password;
export const comparePassword = async (password, hashedPassword) =>
  password === hashedPassword;
