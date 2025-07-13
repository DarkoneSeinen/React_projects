import { Patient, NewPatientEntry, NonSensitivePatientEntry } from '../types';
import patientData from '../../data/patients';

const patients: Patient[] = patientData;

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: String(Math.floor(Math.random() * 1000000)),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient
};
