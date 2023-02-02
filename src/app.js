const express = require("express");
const cors = require("cors")
const profileRoute = require("./routes/profile-route")
const authenticateMiddleware = require("./middlewares/authenticate")
const notFoundMiddleware = require("./middlewares/notFound")
const ErrorMiddleware = require("./middlewares/error")
const authRoute = require("./routes/auth-route")
// const { sequelize } = require("./models")

// sequelize.sync({force : true})

const app = express();

app.use(express.json())

app.use(cors());

app.use("/auth",authRoute)
app.use("/profile", authenticateMiddleware, profileRoute)

app.use(notFoundMiddleware)

app.use(ErrorMiddleware)

app.listen(8000, () => console.log("Start server at port 8000"));
