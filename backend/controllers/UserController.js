const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ users });
};

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exist, please login" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    });
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
    return res.status(201).json({ message: "User account created successfully!", user : existingUser });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User account is not created, please signup" });
    }
    const isPasswordMatched = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordMatched) {
        return res.status(400).json({ messgae: "Password not matched!" });
    }
    return res.status(201).json({ message: "Login successful!", user : existingUser });
};

exports.getAllUser = getAllUser;
exports.signup = signup;
exports.login = login;