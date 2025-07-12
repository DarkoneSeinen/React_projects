import express from 'express';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/exercises', (req, res) => {
  const body = req.body as unknown;

  if (
    !body ||
    typeof body !== 'object' ||
    !('daily_exercises' in body) ||
    !('target' in body)
  ) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const { daily_exercises, target } = body as {
    daily_exercises: unknown;
    target: unknown;
  };

  if (
    !Array.isArray(daily_exercises) ||
    typeof target !== 'number' ||
    !daily_exercises.every((d) => typeof d === 'number')
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
