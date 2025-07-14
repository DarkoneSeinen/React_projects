import express from 'express';
import cors from 'cors';

import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(cors());
app.use(express.json()); // Habilita body-parser para JSON

const PORT = 3001;

// Endpoint de prueba para evitar error 404 desde frontend
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

// Rutas principales
app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
