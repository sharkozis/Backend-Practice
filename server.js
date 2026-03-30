const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// In-memory data store
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// Routes

// GET all items
app.get('/api/items', (req, res) => {
    res.status(200).json(items);
});

// GET a specific item by ID
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'The item with the given ID was not found.' });
    res.status(200).json(item);
});

// POST a new item
app.post('/api/items', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).json({ message: 'Name is required and should be minimum 3 characters.' });
    }

    const item = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(item);
    res.status(201).json(item);
});

// PUT (update) an existing item
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'The item with the given ID was not found.' });

    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).json({ message: 'Name is required and should be minimum 3 characters.' });
    }

    item.name = req.body.name;
    res.status(200).json(item);
});

// DELETE an item
app.delete('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'The item with the given ID was not found.' });

    const index = items.indexOf(item);
    items.splice(index, 1);
    res.status(200).json(item);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});