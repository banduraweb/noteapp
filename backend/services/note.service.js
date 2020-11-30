/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const { Types } = require('mongoose');
const errorTypes = require('../constants/errors');
const Note = require('../models/Notes');
const SystemErrorService = require('./errors.service');
const Validation = require('./validation.service');
const GridFsStorageMiddleware = require('../middlewares/img.upload.middleware');

const { ObjectId } = Types;

class NoteService {
  static async createNote(userId, status, description, img) {
    const { error } = Validation.noteDescription({
      description,
    });

    if (error) {
      return SystemErrorService.error('Validations errors', errorTypes.Validation);
    }
    const filename = img ? img.filename : null;
    try {
      const note = new Note({
        status,
        description,
        owner: userId,
        img: filename,
      });

      return await note.save();
    } catch (e) {
      return SystemErrorService.error('An Internal error', errorTypes.Internal);
    }
  }

  static async getNotesImgByName(filename, req, res) {
    GridFsStorageMiddleware().gfs.files.findOne({ filename }, (err, file) => {
      if (!file || file.length === 0) {
        return SystemErrorService.error('Not exists', errorTypes.Exists);
      }

      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        const readStream = GridFsStorageMiddleware().gfs.createReadStream(file.filename);
        return readStream.pipe(res);
      }
      return SystemErrorService.error('Not an image', errorTypes.Validation);
    });
  }

  static async deleteCurrentNoteImg(name, userId, id) {
    // eslint-disable-next-line
    GridFsStorageMiddleware().gfs.remove({ filename: name, root: 'uploads' }, async (err, gridStore) => {
      if (err) {
        return SystemErrorService.error('An Internal error', errorTypes.Internal);
      }
    });

    try {
      const filter = {
        $and: [{ owner: { $eq: ObjectId(userId) } }, { _id: { $eq: ObjectId(id) } }],
      };
      const data = { img: null };
      await Note.findOneAndUpdate(filter, { $set: data });
      return this.getCurrentNote(id, userId);
    } catch (e) {
      return SystemErrorService.error('An Internal error', errorTypes.Internal);
    }
  }

  static async getUserListNotes(userId, skip = 0, size = 5) {
    try {
      const notes = await Note.find({ owner: userId }).skip(+skip).limit(+size);
      const total = await Note.find({ owner: userId }).count();
      return { notes, total };
    } catch (e) {
      return SystemErrorService.error('An Internal error', errorTypes.Internal);
    }
  }

  static async deleteCurrentNote(id, userId) {
    try {
      const filter = {
        $and: [{ owner: { $eq: ObjectId(userId) } }, { _id: { $eq: ObjectId(id) } }],
      };
      return await Note.deleteOne(filter);
    } catch (e) {
      return SystemErrorService.error('An Internal error', errorTypes.Internal);
    }
  }

  static async getCurrentNote(id, userId) {
    try {
      const filter = {
        $and: [{ owner: { $eq: ObjectId(userId) } }, { _id: { $eq: ObjectId(id) } }],
      };
      return await Note.findOne(filter);
    } catch (e) {
      return SystemErrorService.error('An Internal error', errorTypes.Internal);
    }
  }

  static async updateCurrentNote(description, status, userId, id, img) {
    const { error } = Validation.noteDescription({
      description,
    });

    if (error) {
      return SystemErrorService.error('Validations errors', errorTypes.Validation);
    }
    try {
      const filter = {
        $and: [{ owner: { $eq: ObjectId(userId) } }, { _id: { $eq: ObjectId(id) } }],
      };
      const filename = img ? img.filename : null;
      const data = filename ? { description, status, img: filename } : { description, status };
      await Note.findOneAndUpdate(filter, { $set: data });
      return this.getCurrentNote(id, userId);
    } catch (e) {
      return SystemErrorService.error('An Internal error', errorTypes.Internal);
    }
  }
}

module.exports = NoteService;
