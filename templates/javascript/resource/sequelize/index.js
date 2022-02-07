import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import 'dotenv/config'

const {PORT, DB_URI} = process.env
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api", routes)

app.get('/', (req, res) => { res.send("<ChetaJS/>, start building something we'd remember!")});

app.listen(PORT, () => { console.log(`Your app is running on port ${PORT}`)});