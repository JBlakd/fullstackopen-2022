import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises, parseArguments } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    res.json({
      weight: req.query.weight,
      height: req.query.height,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
  } catch (ex) {
    res.status(400).json({ error: "malformed parameters" });
  }
});

app.post('/exercises', (req, res) => {
  try {
    console.log('req.body: ', req.body);

    res.json(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      calculateExercises(parseArguments(req.body.daily_exercises), req.body.target)
    );
  } catch (ex) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: ex.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});