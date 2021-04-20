const express = require('express');
const port = 3001;

const channelRoutes = require('./routes/channelRoutes');
const programRoutes = require('./routes/programRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(express.json());
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});