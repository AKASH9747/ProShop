import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync(`123456`, 10),
    isAdmin: true,
  },
  {
    name: "Akash ps",
    email: "psakash98@gmail.com",
    password: bcrypt.hashSync(`123456`, 10),
    isAdmin: false,
  },
  {
    name: "favas ali",
    email: "favas@example.com",
    password: bcrypt.hashSync(`123456`, 10),
    isAdmin: false,
  },
];

export default users;