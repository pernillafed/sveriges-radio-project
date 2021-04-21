const express = require('express');
const session = require('express-session');
const prefixRoute = '/api/v1';
const port = 3001;
const path = require('path');

const channelRoutes = require('./routes/channelRoutes');
const programRoutes = require('./routes/programRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use(
    session({
        secret: "The biggest radio site in Sweden",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: "auto" }
    })
);

app.use(`${prefixRoute}/channels`, channelRoutes);
app.use(`${prefixRoute}/programs`, programRoutes);
app.use(`${prefixRoute}/categories`, categoryRoutes);
app.use(`${prefixRoute}/users`, userRoutes);

app.use(express.static(path.join(__dirname, "../build")));

app.listen(port, (err) => {
    if (err) {
        console.error("The server could not be started...");
        console.log(err);
        return;
    }
    console.log(`Listening on port ${port}`);
});