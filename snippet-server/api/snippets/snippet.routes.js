const router = require('express').Router();

const controller = require('./snippet.controller');

// GET /snippets
router.get('/', controller.getSnippets);

// GET /snippets/:id
router.get('/:id', controller.getSnippetsById);

// POST /snippets
router.post('/', controller.addSnippet);

// DELETE /snippet/:id
router.delete('/:id', controller.deleteSnippet);

module.exports = router;