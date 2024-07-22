import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
    console.log("Server started!");
});