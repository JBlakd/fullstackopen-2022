import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    res.json({
      weight: req.query.weight,
      height: req.query.height,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    })
  } catch (ex) {
    res.json({ error: "malformed parameters" })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});