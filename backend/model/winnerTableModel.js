const mongoose = require('mongoose');

const winnerTableSchema = mongoose.Schema({
   winnerNumber: {
      type: Number,
      unique: true
   },
   winnerDateTime: {
      type: Date,
      unique: true
   }
},
   {
      timestamps: true
   }
)

module.exports = mongoose.model('WinnerNumber', winnerTableSchema)