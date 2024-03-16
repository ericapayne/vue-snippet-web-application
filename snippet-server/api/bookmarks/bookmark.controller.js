const Bookmark = require('./bookmark.model');

const getBookmarks = async (req, res) => {
    
}

// POST /bookmark
const addBookmark = async (req, res) => {
    const { body } = req;
    try {
        const bookmarkDoc = new Bookmark(body);
        const bookmark = await bookmarkDoc.save();
        res.json(bookmark);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

// DELETE /bookmark/:id
const deleteBookmark = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const bookmark = await Bookmark.findOneAndDelete({ _id: id});
        if (bookmark) {
            res.json({ message: 'success', bookmark: bookmark._id });
        } else {
            res.status(404).json({ error: `No bookmark found by id: ${id}` });
        }

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

};

module.exports = {
    getBookmarks,
    addBookmark,
    deleteBookmark
};