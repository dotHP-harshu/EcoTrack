const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")

const dbConnection = require("./config/dbConnection");


app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Route imports
const authRoutes = require("./routes/auth.routes")
const cfhRoutes = require("./routes/cfh.routes")
const aiRoutes = require("./routes/ai.routes");
const authMiddleWare = require("./middleware/auth.middelware");



// Routes 
app.use("/auth", authRoutes)
app.use("/cfh",authMiddleWare, cfhRoutes )
app.use("/ai",authMiddleWare,aiRoutes)
app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 3000;
dbConnection()
  .then(() => {
    console.log("Database connected.")
    app.listen(PORT, () => {
      console.log("Server started at 3000 port.");
    });
  })
  .catch((err) => {
    console.log("Error on connecting database");
  });
