import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../dist/server.bundle.js'; // bundle SSR

const app = express();
const DIST = path.resolve(__dirname, '../dist');

// Sert client.bundle.js et assets
app.use(express.static(DIST));

app.get('*', (req, res) => {
  const markup = renderToString(<App url={req.url} />);
  res.send(
    `<!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"/><title>MyEfrei Clone</title></head>
      <body>
        <div id="root">${markup}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>`
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SSR server running on port ${PORT}`));