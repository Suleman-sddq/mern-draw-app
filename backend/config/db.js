const mongoose = require('mongoose');


var connectDB = async () => {
   try {
      let conn;
      if (process.env.DB === "cloud") {
         mongoose.set("strictQuery", false);
         conn = await mongoose.connect(process.env.MONGO_URI_CLOUD, { useNewUrlParser: true })
      } else {
         mongoose.set("strictQuery", false);
         conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, { useNewUrlParser: true })
      }
      console.log(`MongoDB connected: ${conn.connection.host}`)
   } catch (error) {
      console.log(error)
      process.exit(1);
   }
}

module.exports = connectDB