import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const added = patientService.addPatient(newPatient);
    res.json(added);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong.';
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
