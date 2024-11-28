import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateEnsemblePage from './pages/CreateEnsemblePage';
import EnsemblesPage from './pages/EnsemblesPage';
import Navbar from './components/Navbar'; // Fixed casing for Navbar
import RegisterInEnsemblePage from './pages/RegisterInEnsemblePage';
import PrivateRoute from './utils/PrivateRoute'; // Import PrivateRoute

function App() {
  return (
    <>
      <Navbar /> {/* Include the Navbar */}
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/create-ensemble"
          element={
            <PrivateRoute>
              <CreateEnsemblePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ensembles"
          element={
            <PrivateRoute>
              <EnsemblesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register-ensemble"
          element={
            <PrivateRoute>
              <RegisterInEnsemblePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
