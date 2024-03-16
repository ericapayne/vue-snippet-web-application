const router = require('express').Router();

const controller = require('./bookmark.controller');

// POST /bookmark
router.post('/', controller.addBookmark);

// DELETE /bookmark/:id
router.delete('/:id', controller.deleteBookmark);

module.exports = router;