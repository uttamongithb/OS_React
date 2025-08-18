import express from 'express'
import connectDb from './db.js';
import 'dotenv/config'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import cors from 'cors'

connectDb();
const app = express();

app.use(cors())
app.use(express.json())


const port = 3000;

const signupUserSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const signupUsers = mongoose.model('signupUsers', signupUserSchama);

app.get('/', (req, res) => {
    res.send("Hello");
})

app.post('/user/signup', async (req, res) => {
    try {
        const userData = req.body;

        const salt = await bcrypt.genSalt(10);  
        userData.password = await bcrypt.hash(userData.password, salt);


        const newData = new signupUsers(userData);

        await newData.save();
        
        res.status(201).json({
            message:"User Created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"server error"
        })
    }
})

app.post('/user/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const loginAuth = await signupUsers.findOne({email});
        
        if(!loginAuth){
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        
        const isMatch = await bcrypt.compare(password, loginAuth.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        res.status(200).json({
            message:"User Found"
        })
        
    } catch (error) {
        res.status(500).json({
            message:"server error"
        })
    }
})

app.listen(port, () => {
    console.log(`server running on ${port}`);
})