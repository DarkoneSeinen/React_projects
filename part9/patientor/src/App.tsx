import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Typography, Button, Divider } from '@mui/material';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';

const App = () => (
  <Container>
    <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
      Patientor
    </Typography>
    <Router>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
      <Divider hidden />
      <Routes>
        <Route path="/" element={<PatientListPage />} />
        <Route path="/patients/:id" element={<PatientPage />} />
      </Routes>
    </Router>
  </Container>
);

export default App;
