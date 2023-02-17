const mongoose = require('mongoose');




const drawSchema = mongoose.Schema(
   {
      drawDateTime: {
         type: Date,
         unique: true,
         required: [true, 'Please add draw date and time']
      },
      drawData: {
         type: Array,
         required: true
      },
      drawStatus: {
         type: String,
         default: 'pending'
      }
   },
   {
      timestamps: true
   }
)

module.exports = mongoose.model('Draw', drawSchema);