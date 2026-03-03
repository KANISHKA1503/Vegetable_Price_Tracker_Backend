const mongoose=require('mongoose')
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vegetable_price');
        console.log("MongoDB connected Successfully 💥🪄🎊🎉");
    } catch(err)
    {
        console.error("MongoDB connection error",err.message)
        process.exit(1)
    }
}
module.exports=connectDB