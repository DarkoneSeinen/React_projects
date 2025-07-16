import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import patientService from '../services/patients';
import { Patient } from '../types';

const PatientListPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    patientService.getAll().then(data => setPatients(data));
  }, []);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(p => (
            <TableRow
              key={p.id}
              hover
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/patients/${p.id}`)}
            >
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.occupation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PatientListPage;
