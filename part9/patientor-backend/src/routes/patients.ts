import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const censoredEntries = patientService.getNonSensitiveEntries();
  console.log(censoredEntries);
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    } else {
      res.status(400).send('unknown error. I hope somebody gets fired for this blunder.');
    }
  }

});

export default router;