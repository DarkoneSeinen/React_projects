import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const data = await patientService.getOne(id);
        setPatient(data);
      };
      void fetchPatient();
    }
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Gender: {patient.gender}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      {/* Aquí puedes mostrar sus entries si ya están disponibles */}
    </div>
  );
};

export default PatientPage;
