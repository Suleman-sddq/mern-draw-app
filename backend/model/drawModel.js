const mongoose = require('mongoose');


const drawSchema = mongoose.Schema(
   {
      drawDateTime: {
         type: Date,
         unique: true,
         required: [true, 'Please add draw date and time']
      },
      fareDraw: {
         type: String,
         required: [true, "Please select draw mode."]
      },

      drawWinnerNum: {
         type: String,
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