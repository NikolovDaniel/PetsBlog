import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AllPets from './Components/Navbar/AllPets';
import PetPanel from './Components/Navbar/PetPanel';
import PetById from './Components/Pet/PetById';
import PetForm from './Components/Pet/PetForm';
import PetRandom from './Components/Navbar/PetRandom';
import ImageForm from './Components/Image/ImageForm';
import PreferencesForm from './Components/Preferences/PreferencesForm';
import Footer from './Components/Footer/FooterComp';
import PetEdit from './Components/Pet/PetEdit';
import DownloadPetIds from './Components/Pet/DownloadPetIds';

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
          <Route path="/pet-edit" element={<PetEdit />} />
          <Route path="/download-pet-ids" element={<DownloadPetIds />} />
        </Routes>
        <Footer />
    </Router>
  );
};

export default App;