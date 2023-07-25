import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AllPets from './Components/Navbar/AllPets';
import PetPanel from './Components/Navbar/PetPanel';
import PetById from './Components/Pet/PetById';
import PetForm from './Components/Navbar/PetForm';
import PetRandom from './Components/Navbar/PetRandom';
import ImageForm from './Components/Navbar/ImageForm';
import PreferencesForm from './Components/Navbar/PreferencesForm';

const App = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllPets />} />
          <Route path="/pet-panel" element={<PetPanel />} />
          <Route path="/random-pet" element={<PetRandom />} />
          <Route path="/pet/:id" element={<PetById />} />
          <Route path="/pet-add" element={<PetForm />} />
          <Route path="/image-add" element={<ImageForm />} />
          <Route path="/preferences-add" element={<PreferencesForm />} />
        </Routes>
    </Router>
  );
};

export default App;