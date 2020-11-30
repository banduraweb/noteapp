/* eslint-disable */
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
require('dotenv')
  .config();
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config/config');

let gfs = {};
module.exports = ()=>{

  const connection = mongoose.createConnection(config.db(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });

  const storage = new GridFsStorage({
    url: config.db(),
    file: (req, file) => new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    }),
  });
  const upload = multer({ storage });
  return {
    upload,
    gfs
  }
};


