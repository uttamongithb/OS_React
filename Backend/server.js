import express from 'express'
import connectDb from './db.js';
import 'dotenv/config'
import mongoose, { model } from 'mongoose';

connectDb();
const app = express();
app.use(express.json())


const port = 3000;

const registerUserSchama = new mongoose.Schema({
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

const registerUsers = mongoose.model('registerUsers', registerUserSchama);

app.get('/', (req, res) => {
    res.send("Hello");
})

app.post('/user/register', async (req, res) => {
    try {
        const userData = req.body;
        const newData = new registerUsers(userData);
        const data = await newData.save();
        res.status(201).json({
            message:"User Created Successfully"
        })
        console.log(data);
    } catch (error) {
        res.status(500).json({
            message:"server error"
        })
    }
})

app.get('/user/login',async(req,res)=>{
    try {
        const {email} = req.body;
        const loginAuth = await registerUsers.findOne({email});
        
        if(!loginAuth){
            return res.status(404).json({
                message:"User Not Found"
            })
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