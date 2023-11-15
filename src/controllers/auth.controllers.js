import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json(["This email is already in use"]);

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const userSaved = await newUser.save();

    const accessToken = await createAccessToken({ id: userSaved._id });

    res.cookie("token", accessToken);
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json("Error Message");
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Invalid Credentials"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json(["Incorrect Password"]);

    const accessToken = await createAccessToken({ id: userFound._id });

    res.cookie("token", accessToken);
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json("Error Message");
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User Not Found" });

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
  res.send(req.user);
};

export const verifyToken = async (req, res) =>{
  const {token}=req.cookies

  if(!token) return res.status(401).json(["Not Authorized"])

  jwt.verify(token,TOKEN_SECRET, async (err,user)=>{
    if(err) return res.status(401).json(["Not Authorized"])

    const userFound = await User.findById(user.id)

    if(!userFound) return res.status(401).json(["Not Authorized"])

    return res.json({
      id:userFound.id,
      username:userFound.username,
      email:userFound.email
    })
  })
}