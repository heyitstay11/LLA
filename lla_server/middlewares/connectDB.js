import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(_ => console.log('Database Connected'))
        .catch(err => console.log(err))
}

export default connectDB;