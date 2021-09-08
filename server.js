const express = require('express');

const app = express();

const PORT = 4000;

// Routes
app.get('/', (req,res) => {
  res.send('Cravings Homepage')
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))