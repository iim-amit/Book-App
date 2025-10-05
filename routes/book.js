const express = require('express');
const Book = require('../models/Book');
const protect = require('../middleware/auth');
const router = express.Router();

// Search books with filters
router.get('/search', async (req, res) => {
  try {
    const { q, genre, author, year, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build search query
    let query = {};
    
    // Text search across title, author, description
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Filter by genre
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }
    
    // Filter by author
    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }
    
    // Filter by year
    if (year) {
      query.year = parseInt(year);
    }
    
    const books = await Book.find(query)
      .populate('addedBy', 'name')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });
      
    const total = await Book.countDocuments(query);
    
    res.json({ 
      books, 
      totalPages: Math.ceil(total / parseInt(limit)), 
      currentPage: parseInt(page),
      total 
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all books with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  try {
    const books = await Book.find()
      .populate('addedBy', 'name')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
      
    const total = await Book.countDocuments();
    
    res.json({ 
      books, 
      totalPages: Math.ceil(total / limit), 
      currentPage: page,
      total 
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all unique genres
router.get('/filters/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres.sort());
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all unique authors
router.get('/filters/authors', async (req, res) => {
  try {
    const authors = await Book.distinct('author');
    res.json(authors.sort());
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add book (protected)
router.post('/', protect, async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  try {
    const book = await Book.create({ 
      title, 
      author, 
      description, 
      genre, 
      year, 
      addedBy: req.user._id 
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name');
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update book (only owner)
router.put('/:id', protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    const updated = await Book.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete book (only owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;