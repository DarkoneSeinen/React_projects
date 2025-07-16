import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../services/patients';
import { Patient, Entry, Diagnose } from '../types';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    patientService.getAll().then(() => {
      if (id) {
        patientService.getOne(id).then(p => setPatient(p));
      }
    });
    patientService.getDiagnoses().then(d => setDiagnoses(d));
  }, [id]);

  if (!patient) return <Typography>Loading...</Typography>;

  const findDiagnosis = (code: string) => diagnoses.find(d => d.code === code)?.name;

  const renderEntry = (entry: Entry) => (
    <ListItem key={entry.id} alignItems="flex-start">
      <ListItemText
        primary={`${entry.date} — ${entry.type}`}
        secondary={
          <>
            <Typography component="span">{entry.description}</Typography>
            {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
              <Typography key={code} variant="body2">
                {code} {findDiagnosis(code) ?? ''}
              </Typography>
            ))}
          </>
        }
      />
    </ListItem>
  );

  return (
    <div>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>DOB: {patient.dateOfBirth}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>

      <Typography variant="h5" style={{ marginTop: '1em' }}>
        Entries
      </Typography>
      <List>{patient.entries.map(renderEntry)}</List>
    </div>
  );
};

export default PatientPage;
