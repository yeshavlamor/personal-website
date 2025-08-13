import cors from 'cors';
import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors("*")); // accept url from anywhere
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// app.use("/api-v1", routes)

app.use("*", (req, res) => {
    res.status(404).json({
        status: "404 Not Found",
        message: "Route Not Found",
    }); 
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

