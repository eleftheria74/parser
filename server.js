const express = require('express');
const bodyParser = require('body-parser');
const Parser = require'./src/mercury');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/parse', async (req, res) => {
  const { url, html, ...opts } = req.body;

  if (!url && !html) {
    return res.status(400).json({ error: true, message: 'Missing URL or HTML' });
  }

  try {
    const result = await Parser.parse(url, { html, ...opts });
    res.json(result);
  } catch (err) {
    console.error('Parse error:', err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Mercury parser is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
