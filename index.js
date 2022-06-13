const express = require("express");
const connectDB = require("./config/db")
const cors = require('cors')
const morgan = require("morgan")

const app = express();

//Connect to database
connectDB()

app.use(express.json({extended: false}));
app.use(cors());
app.use(morgan("tiny"));

morgan.token('body', (req) => JSON.stringify(req.body))

//Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.use("/api/statistics", require("./routes/statistics"));

const PORT = 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));