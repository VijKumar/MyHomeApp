import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './jobexcel';
import { BrowserRouter } from 'react-router-dom';


const BioconApplicationForm = lazy(() => import('./components/BioconApplicationForm'));
const BioconThankYou = lazy(() => import('./components/BioconThankYou'));


function App() {
    return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/biocon-application" element={<BioconApplicationForm />} />
          <Route path="/biocon-thankyou" element={<BioconThankYou />} />
        </Routes>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
