import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const newPatient: NewPatientEntry = req.body;
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;
