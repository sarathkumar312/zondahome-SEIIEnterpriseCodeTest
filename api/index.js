const express = require('express');
const app = express();
const cors = require('cors');
const subdivisions = require('./subdivision.json');

app.use(cors());

app.get('/api/subdivisions', (req, res) => {
    res.json(subdivisions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
