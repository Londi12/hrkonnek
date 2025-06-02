import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Import your routes
import adminRoutes from '../server/dist/routes/admin.routes.js';
import candidateRoutes from '../server/dist/routes/candidate.routes.js';

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/candidates', candidateRoutes);

// Serve static files from the React app
app.use(express.static(join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
