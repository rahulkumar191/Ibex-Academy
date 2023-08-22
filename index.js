const express = require('express');
const app = express();
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const cors = require('cors');
app.use(cors());

app.use(express.json());

const port = 3005;

db();

app.get('/', (req, res) => {
    res.send("Hello Guys");
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


app.listen(port, () => {
    console.log('IBEX ACADEMY is running on port : ', port);
});