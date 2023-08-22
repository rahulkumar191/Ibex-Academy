const User = require('../models/user');
const Course = require('../models/course');
const jwtUtils = require('../utils/jwtUtils');
const { response } = require('express');


module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (!user) return res.status(404).json({ message: "email or password wrong" });
    const token = jwtUtils.generateJWT({ email: user.email, role: 'user', id: user._id });
    res.json({ message: "Loged in successfully", token: token });
}

module.exports.signUp = async (req, res) => {
    const { email, password } = req.body;
    const userExisting = await User.findOne({ email: email });
    if (userExisting) return res.status(403).json({ message: "User already exist" });
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        const token = jwtUtils.generateJWT({ email: user.email, role: "user", id: user._id });
        res.json({ message: "Sign up successefully", token: token });
    }
    catch (err) {
        res.json({ message: "Please fill all required filled" });
    }
}

module.exports.myCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('purchasedCourses');
        if (!user) {
            return res.status(403).json({message: "User not found"});
        }
        return res.json(user.purchasedCourses);

    } catch (err) {
        res.status(403).json(err);
    }
}



module.exports.profile = async (req, res) => {
    try {
        const me = await User.findOne({ email: req.user.email });
        res.json(me);
    }
    catch (err) {
        res.json({ Error: err });
    }
}