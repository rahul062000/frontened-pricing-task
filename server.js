const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS middleware first
app.use(express.json()); // Parse JSON request bodies

app.post('/proxy', async (req, res) => {
    const apiUrl = 'https://forms.maakeetoo.com/formapi/741';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
