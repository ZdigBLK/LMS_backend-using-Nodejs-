const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express()
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000

dbConnect();

app.get("/", (req, res) => {
    res.send("Hello from LMS Servre")
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})