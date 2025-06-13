const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const reportRoutes = require("./routes/Report");

app.use('/api/auth', authRoutes);
app.use('/api/report', reportRoutes);

app.get('/', (req, res) => res.send("Api is running"));

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);    
})