const express = require('express');
const app = express();
const connectToMongo = require('./db');
const authUser = require('./routes/auth');
const authNote = require('./routes/notes');

app.use(express.json());

connectToMongo();
const port = 3088

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/// making specific routes

app.use('/api/auth',authUser);
app.use('/api/notes',authNote);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

