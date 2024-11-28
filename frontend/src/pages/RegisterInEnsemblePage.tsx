import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEnsembles } from '../services/ensembleService';
import { registerInEnsemble } from '../services/ensembleService';

interface Ensemble {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  registeredUsers: string[];
}

const RegisterInEnsemblePage: React.FC = () => {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnsembles = async () => {
      try {
        const response = await getAllEnsembles(); // Fetch ensembles
        setEnsembles(response);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchEnsembles();
  }, []);

  const handleRegister = async (ensembleId: string) => {
    try {
      setError(null);
      setSuccess(null);
      const message = await registerInEnsemble(ensembleId); // Register in ensemble
      setSuccess(message);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Register in an Ensemble</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <ul>
        {ensembles.map((ensemble) => (
          <li key={ensemble._id} style={{ marginBottom: '1rem' }}>
            <h2>{ensemble.name}</h2>
            <p>{ensemble.description}</p>
            <button onClick={() => handleRegister(ensemble._id)}>
              Register in {ensemble.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/ensembles')}>Back to All Ensembles</button>
    </div>
  );
};

export default RegisterInEnsemblePage;
