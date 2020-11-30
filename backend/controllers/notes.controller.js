const NoteService = require('../services/note.service');
const Response = require('../helpers/defaultResponse');

class NotesController {
  static async getUserListNotes(req, res) {
    const { userId } = req.user;
    const { skip, size } = req.query;
    const response = await NoteService.getUserListNotes(
      userId, skip, size,
    );
    Response.defaultResponse(res, 200, response);
  }

  static async getNotesImgByName(req, res) {
    const { filename } = req.params;
    return NoteService.getNotesImgByName(
      filename, req, res,
    );
  }

  static async deleteCurrentNoteImg(req, res) {
    const { name } = req.params;
    const { id } = req.body;
    const { userId } = req.user;
    const response = await NoteService.deleteCurrentNoteImg(
      name, userId, id, req, res,
    );
    Response.defaultResponse(res, 200, response);
  }

  static async getCurrentNote(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    const response = await NoteService.getCurrentNote(
      id, userId,
    );
    Response.defaultResponse(res, 200, response);
  }

  static async updateCurrentNote(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    const { description, status } = req.body;
    const response = await NoteService.updateCurrentNote(
      description, status, userId, id, req.file,
    );
    Response.defaultResponse(res, 200, response);
  }

  static async deleteCurrentNote(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    const response = await NoteService.deleteCurrentNote(
      id, userId,
    );
    Response.defaultResponse(res, 200, response);
  }

  static async createNote(req, res) {
    const { userId } = req.user;
    const { status, description } = req.body;
    const response = await NoteService.createNote(
      userId, status, description, req.file,
    );
    Response.defaultResponse(res, 200, response);
  }
}

module.exports = NotesController;
