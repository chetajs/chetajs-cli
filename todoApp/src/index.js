import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/v1/userRoutes";
import authRoutes from "./routes/v1/authRoutes";
import mongoose from "mongoose";
import 'dotenv/config'

const {PORT, DB_URI} = process.env
const app = express();
const entry = "/api/v1";

// db connection
mongoose.Promise =  global.Promise
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.get('/', (req, res) => { res.send("ChetaJS, start building something we'd remember!")});

app.listen(PORT, () => { console.log(`Your app is running on port ${PORT}`)});