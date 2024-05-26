const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, handleError } = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const passportSetup = require("./utils/passport");
const googleRouter = require("./routes/googleRoutes");
const { tutCatRouter } = require("./routes/tutCatRoutes");
const app = express()
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000

dbConnect();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "myLittleSecret",
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 12 * 60 * 60,
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:4000/google">login With Google</a>`);
});

app.use("/api/user", userRouter)
app.use("/", googleRouter)
app.use("/api/tutorial/category",tutCatRouter)

app.use(notFound)
app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})