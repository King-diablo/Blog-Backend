import User from "../model/User.js";
import bcrypt from 'bcrypt';

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find({});
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
}

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already exist. Login Instead' });
    }

    const hashedPassword = generateHashedPassword(password);

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

    return res.status(201).json({ user });
}

export const logIn = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser

    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'Could not find the specified user' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect password' });
    }
    return res.status(200).json({ message: 'Login Successful' })
}

function generateHashedPassword(password) {
    const saltRounds = 10;

    // Technique 1 (generate a salt and hash on separate function calls):
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
