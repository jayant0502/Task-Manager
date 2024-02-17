const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getUser = (req, res) =>{
    try{
        
        res.status(200).send({message:"working Fine"});
    }
    catch(error){
        res.status(400).send({ message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password });

        await user.save();
        res.status(200).send({ user, message: "User created successfully" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const loginUser= async (req ,res) => {

    try{
        const { email, password } = req.body;

    const user = await User.findOne({ email: email});
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Password is incorrect");
    }

    const token = jwt.sign(
        {
            _id: user._id.toString(),
        },
        process.env.JWT_SECRET_KEY
    );

    res.status(200).send({ user, token, message:"logged in successfully"});
    
    }
    catch(error){
        res.status(400).send({ message: error.message });
    }

}

module.exports = {getUser,
    registerUser,
    loginUser
};
