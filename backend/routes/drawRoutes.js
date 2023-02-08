const express = require('express');
const router = express.Router();
const { getDraw, addDraw, editDraw, deleteDraw, getCurrentDraw, getAllDraws } = require('../controllers/drawController')



router.route('/').get(getDraw).post(addDraw);
router.route('/getAll').get(getAllDraws)
router.route('/getCurrentDraw').get(getCurrentDraw)
router.route('/:id').patch(editDraw).delete(deleteDraw);
module.exports = router;