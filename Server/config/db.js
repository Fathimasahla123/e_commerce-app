const {default : mongoose} = require("mongoose")
require("dotenv").config()

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://Cluster0:KSERXorIMQXTHs4a@cluster0.sssvk.mongodb.net/ecommerce")
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB