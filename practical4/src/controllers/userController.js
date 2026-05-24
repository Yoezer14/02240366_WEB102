import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
export const createUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to create user",
    });

  }
};

// GET USERS
export const getUsers = async (req, res) => {
  try {

    const users = await prisma.user.findMany();

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch users",
    });

  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // check user exists
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    // check password
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Login failed",
    });

  }
};