const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

const Note = mongoose.model('Note', { text: String });

app.post('/add-note', async (req, res) => {
    const note = new Note({ text: req.body.text });
    await note.save();
    res.json("Saved");
});

app.get('/', (req, res) => res.send("Server Running"));

app.listen(process.env.PORT || 3000);