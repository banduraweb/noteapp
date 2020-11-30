const express = require('express');

const router = express.Router();
const NotesController = require('../controllers/notes.controller');
const auth = require('../middlewares/auth.middleware');
const crudImg = require('../middlewares/img.upload.middleware');

router.get('/get-list/', auth, NotesController.getUserListNotes);
router.get('/get-current/:id', auth, NotesController.getCurrentNote);
router.put('/update-current/:id', [auth, crudImg().upload.single('img')], NotesController.updateCurrentNote);
router.delete('/delete-current/:id', auth, NotesController.deleteCurrentNote);
router.post('/create', [auth, crudImg().upload.single('img')], NotesController.createNote);

router.get('/image/:filename', auth, NotesController.getNotesImgByName);
router.post('/files/:name', auth, NotesController.deleteCurrentNoteImg);

module.exports = router;
