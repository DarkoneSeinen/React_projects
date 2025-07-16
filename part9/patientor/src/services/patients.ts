import axios from 'axios';
import { Patient, Diagnose } from '../types';
import { apiBaseUrl } from '../constants';

const getAll = () => axios.get<Patient[]>(`${apiBaseUrl}/patients`).then(res => res.data);
const getOne = (id: string) =>
  axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then(res => res.data);
const getDiagnoses = () =>
  axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`).then(res => res.data);

export default { getAll, getOne, getDiagnoses };
