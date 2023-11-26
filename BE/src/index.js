const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const password = process.env.MONGO_DB;
const url = `mongodb+srv://root:${password}@cluster0.3y7juta.mongodb.net/?retryWrites=true&w=majority`

app.get('/', (req, res) => {
    return res.send('Hello world');
})

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);


mongoose.connect(url)
    .then(() => {
        console.log('Connect Db success');
    })
    .catch(() => {
        console.log('Connect Db failed');
    })

app.listen(port, () => {
    console.log('Server is running on port:  ', + port);
});