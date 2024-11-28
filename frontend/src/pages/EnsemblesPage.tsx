import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

interface Ensemble {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  registeredUsers: string[];
}

const EnsemblesPage: React.FC = () => {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnsembles = async () => {
      try {
        const response = await apiClient.get('/ensemble'); // Fetch ensembles from the backend
        setEnsembles(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch ensembles.');
      }
    };

    fetchEnsembles();
  }, []);

  return (
    <div>
      <h1>All Ensembles</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {ensembles.map((ensemble) => (
          <li key={ensemble._id}>
            <h2>{ensemble.name}</h2>
            <p>{ensemble.description}</p>
            <p>
              Created By: <strong>{ensemble.createdBy}</strong>
            </p>
            <p>
              Members: <strong>{ensemble.registeredUsers.length}</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnsemblesPage;
