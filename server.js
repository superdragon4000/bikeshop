const express = require('express');
const open = require('open');

const PORT = 80;

const app = express();
app.use(express.static('public'));
app.listen(PORT);

(async () => {
  await open(`http://localhost:${PORT}`);
})();
