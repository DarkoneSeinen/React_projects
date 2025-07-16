import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatient, Entry, EntryWithoutId } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (id: string, entry: EntryWithoutId): Entry => {
  const patient = getPatientById(id);
  if (!patient) throw new Error('Patient not found');
  const newEntry = { id: uuid(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntryToPatient
};