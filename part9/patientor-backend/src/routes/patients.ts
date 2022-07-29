import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const censoredEntries = patientService.getNonSensitiveEntries();
  console.log(censoredEntries);
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatientEntry = patientService.addPatient(req.body);
  res.json(newPatientEntry);
});

export default router;