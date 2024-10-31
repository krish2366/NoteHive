const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 5000;

const connectToMongo = require("./db");
connectToMongo();

// middlewares
app.use(cors())
app.use(express.json())


// Routes
app.use("/api/auth" , require("./routes/auth"))
app.use("/api/notes" , require("./routes/notes"))


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
