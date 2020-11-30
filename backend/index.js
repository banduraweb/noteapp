require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const userRoute = require('./routes/auth.router');

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());

const noteRoute = require('./routes/note.router');

app.use('/user', userRoute);
app.use('/notes', noteRoute);

const port = config.port() || 8081;
const { connection } = mongoose;

(async () => {
  try {
    await mongoose.connect(config.db(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Started..on.port.${port}`);
    });
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
})();

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
