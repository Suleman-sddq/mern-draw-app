const Draw = require('../model/drawModel');
const asyncHandler = require('express-async-handler');
const WinnerNumber = require('../model/winnerTableModel')


// @Desc     Get Draws
// @Route    GET /api/draw
// @Access   Private
const getDraw = asyncHandler(async (req, res) => {
   try {
      const draw = await Draw.find({ 'drawStatus': 'pending' }).sort('drawDateTime')
      res.status(200).send(draw);
   } catch (error) {
      res.status(404).send({ error: 'There are no draws.', message: error });
   }
})

// @Desc     Get All Draws
// @Route    GET /api/getAll
// @Access   Public
const getAllDraws = asyncHandler(async (req, res) => {
   try {
      const draws = await Draw.find({ 'drawStatus': 'not-pending' }).sort({ 'drawDateTime': -1 })
      res.status(200).send(draws);
   } catch (error) {
      res.status(404).send({ error: 'There are no draws.', message: error });
   }
})


// @Desc     Get Current Draw
// @Route    GET /api/getCurrentDraw
// @Access   Private
const getCurrentDraw = asyncHandler(async (req, res) => {
   try {
      const draw = await Draw.find({ 'drawStatus': 'pending' }).sort('drawDateTime').limit(1);
      res.status(200).send(draw);
   } catch (error) {
      res.status(404).send({ error: 'There are no draws.', message: error });
   }

})


// @Desc     Add Draw
// @Route    POST /api/draw 
// @Access   Private
const addDraw = asyncHandler(async (req, res) => {
   if (!req.body.drawDateTime) {
      res.status(400)
      throw new Error('Please enter draw date and time');
   }
   try {
      const draw = await Draw.create({
         drawDateTime: req.body.drawDateTime,
         drawWinnerNum: req.body.drawWinnerNum,
         fareDraw: req.body.fareDraw
      })
      res.status(200).json(draw);
   } catch (error) {
      res.status(400).json({ error: error, message: "Data is not correct. Please try again." });
   }


})


// @Desc     Edit Draw
// @Route    PUT /api/draw/:id 
// @Access   Private
const editDraw = asyncHandler(async (req, res) => {
   const draw = await Draw.findById(req.params.id);
   console.log(draw);
   if (!draw) {
      res.status(400)
      throw new Error("Draw not found.")
   }

   const updatedDraw = await Draw.findByIdAndUpdate(req.params.id, req.body, {
      new: true
   })
   res.status(200).json(updatedDraw);
}
)

// @Desc     Delete Draw
// @Route    DELETE /api/draw/:id 
// @Access   Private
const deleteDraw = asyncHandler(async (req, res) => {
   const draw = await Draw.findByIdAndRemove(req.params.id);

   if (!draw) {
      res.status(400);
      throw new Error('Goal not found');
   }
   draw.remove();
   res.status(200).json({ id: req.params.id });
})

// // @Desc     Add Winner Number
// // @Route    POST /api/draw/addwinner 
// // @Access   Private
// const getWinner = asyncHandler(async (req, res) => {
//    const winner = await WinnerNumber.find().sort('winnerDateTime')
//    res.status(200).json(winner);
// })

// // @Desc     Add Winner Number
// // @Route    POST /api/draw/addwinner 
// // @Access   Private
// const addWinner = asyncHandler(async (req, res) => {
//    if (req.body.winnerNumber && req.body.winnerDateTime) {
//       const winner = await WinnerNumber.create({
//          winnerNumber: req.body.winnerNumber,
//          winnerDateTime: req.body.winnerDateTime,
//          S
//       });
//       res.status(200).json(winner);
//    } else {
//       res.status(400);
//       throw new Error("Could'nt update Winner Table.");
//    }

// })


module.exports = {
   getDraw,
   addDraw,
   deleteDraw,
   editDraw,
   getCurrentDraw,
   getAllDraws
}