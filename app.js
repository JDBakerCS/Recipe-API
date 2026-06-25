

const express = require("express");
const apiRouter = require("./api");
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());


// function requestLogger(req, res, next) {
//   console.log(`${req.method} ${req.originalUrl}`);
//   next();
// }
//app.use(requestLogger)


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   next();
// });


app.get("/", (req, res, next) => {
  try {
    res.send("Recipe app is running");
  } catch (err) {
    next(err);
  }
})
app.use("/api", apiRouter);



function errorHandling(err, req, res, next) {
  console.error(err);

  res.status(500).json({
    error: "Something went wrong on the server",
  })
}

app.use(errorHandling);

app.listen(8080, () => {
  console.log("Server running on port 8080")
});




