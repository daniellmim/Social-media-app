import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER USER //
export const register = async (req, res) => {
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        }= req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }catch(e){
        res.status(500).json({error: e});
    }
}

// LOGGING IN //
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            res.status(404).json({error: 'user not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({error: 'incorrect password'});
        }
        // const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        const token = jwt.sign({_id: user._id}, 'SOME_SECRET');
        delete user.password;
        res.status(200).json({token, user});
    }catch(e){
        res.status(500).json({error: e});
    }
}