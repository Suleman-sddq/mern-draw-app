const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const morgan = require('morgan')
const cors = require('cors');

const drawRoutes = require('./routes/drawRoutes')
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const port = process.env.PORT || 8080;
connectDB();
const app = express();
app.use(cors());


app.use(errorHandler);
app.use(express.json());

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }))


// Serve frontend
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '../frontend/build')))

   app.get('/', (req, res) => { return res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')) }
   )
} else {
   app.get('/', (req, res) => res.send('Please set to production'))
}

app.use('/api/draw', drawRoutes);
app.use('/api/user', userRoutes);


app.listen(port, () => {
   console.log("Server has started at Port: " + port)
})
