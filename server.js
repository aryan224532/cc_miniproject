const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
// Note: Ensure MONGO_URI is set in Render's Environment Variables
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Successfully connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Database Schema
// We use 'text' here to match your current database entries
const Note = mongoose.model('Note', { 
    text: String,
    date: { type: Date, default: Date.now }
});

// Routes
app.post('/add-note', async (req, res) => {
    try {
        const note = new Note({ text: req.body.text });
        await note.save();
        console.log("📝 New note saved:", req.body.text);
        res.status(200).json("Saved Successfully");
    } catch (error) {
        console.error("❌ Error saving note:", error);
        res.status(500).json("Error saving to database");
    }
});

// Root Route for Health Check
app.get('/', (req, res) => {
    res.send("🚀 Server is running and healthy!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📡 Server listening on port ${PORT}`);
});
