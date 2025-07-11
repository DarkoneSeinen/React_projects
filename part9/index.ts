import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();
const PORT = 3002;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
