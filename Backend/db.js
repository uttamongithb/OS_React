import mongoose from 'mongoose';
import 'dotenv/config'

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("DB connected");
    } catch (error) {
        console.log("DB not connected");
    }
}

export default connectDb