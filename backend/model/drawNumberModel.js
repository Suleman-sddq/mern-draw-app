const mongoose = require('mongoose');

const drawNumSchema = mongoose.Schema({

   drawNumber: {
      type: Number,
      required: [true, "please add the draw number"],
      unique: true,
   },
   batchNumber: {
      type: Number,
      required: [true, "please enter the batch number"],
      unique: true,
   }
},
   {
      timestamps: true
   })

module.exports = mongoose.model('DrawNumber', drawNumSchema)