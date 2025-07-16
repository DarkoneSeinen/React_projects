import { Patient, Gender } from '../src/types';

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    dateOfBirth: "1990-01-01",
    ssn: "123-45-6789",
    gender: Gender.Male,
    occupation: "Software Engineer",
    entries: [
      {
        id: "a",
        date: "2020-01-01",
        type: "HealthCheck",
        specialist: "Dr. Smith",
        description: "Yearly checkup",
        healthCheckRating: 1,
      }
    ]
  },

];

export default patients;