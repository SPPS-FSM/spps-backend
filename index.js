const express = require("express");
const app = express();
const dotenv = require("dotenv");
const routes = require("./src/routes/index.route");
dotenv.config();
const cookieSession = require("cookie-session");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieSession({
//     name: 'spps-session',
//     keys: ['COOKIE-SESSION'],
//     httpOnly: false
// }))

const corsOptions = {
    origin: "http://localhost:3000",
    httpOnly: true,
};

app.use(cors(corsOptions));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
