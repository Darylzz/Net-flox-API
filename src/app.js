const express = require("express");
const cors = require("cors")
const profileRoute = require("./routes/profile-route")
const movieRoute = require("./routes/movie-route")
const categoryRoute = require("./routes/category-route")
const authenticateMiddleware = require("./middlewares/authenticate")
const notFoundMiddleware = require("./middlewares/notFound")
const ErrorMiddleware = require("./middlewares/error")
const authRoute = require("./routes/auth-route")
const watchListRoute = require("./routes/watchList-route")
// const { sequelize } = require("./models")

// sequelize.sync({force : true})

const app = express();
app.use('/public', express.static('public'))
app.use(express.json())

app.use(cors());

app.use("/auth",authRoute)
app.use("/profile", authenticateMiddleware, profileRoute)
app.use("/movie", authenticateMiddleware, movieRoute)
app.use("/watchlist", authenticateMiddleware, watchListRoute)
app.use("/category", authenticateMiddleware, categoryRoute)

app.use(notFoundMiddleware)

app.use(ErrorMiddleware)

app.listen(8000, () => console.log("Start server at port 8000"));
