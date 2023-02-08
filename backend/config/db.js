const mongoose = require('mongoose');


var connectDB = async () => {
   try {
      let conn;

      mongoose.set("strictQuery", false);
      conn = await mongoose.connect(process.env.MONGO_URI_CLOUD, { useNewUrlParser: true })

      console.log(`MongoDB connected: ${conn.connection.host}`)
   } catch (error) {
      console.log(error)
      process.exit(1);
   }
}

module.exports = connectDB