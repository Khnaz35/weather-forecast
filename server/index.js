const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

const createApp = () => {
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use((err, req, res, next) => {
    console.log(err);
    console.log(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  })
}

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log(`You are now live on port ${PORT}`);
  })
}

async function bootApp() {
  await createApp();
  await startListening();
}

bootApp();

module.exports = app;
