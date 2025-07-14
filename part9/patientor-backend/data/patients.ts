import { Patient, Gender } from '../src/types';

const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    dateOfBirth: '1990-01-01',
    ssn: '123-45-6789',
    gender: Gender.Male,
    occupation: 'Software Engineer'
  },
  {
    id: '2',
    name: 'Jane Smith',
    dateOfBirth: '1985-05-05',
    ssn: '987-65-4321',
    gender: Gender.Female,
    occupation: 'Doctor'
  }
];

export default patients;
