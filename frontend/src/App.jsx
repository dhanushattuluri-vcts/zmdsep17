import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import './App.css';

import HomePage from './pages/home';
import CameraPage from './pages/products/cam';
import DelibotPage from './pages/products/delibot';
import DronePage from './pages/products/drone';
import EdgeBoxPage from './pages/products/edge_box';
import SensorsPage from './pages/products/sensors';
import ServerPage from './pages/products/server';
import SolutionsPage from './pages/products/solutions';
import EdgeAIPage from './pages/edge_ai';
import ContactPage from './pages/contact';

export default function App() {
  return (
    <div className="app-root">
      {/* Header displayed on every page */}
      <Header />

      {/* Main Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edge-ai" element={<EdgeAIPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/cam" element={<CameraPage />} />
          <Route path="/products/delibot" element={<DelibotPage />} />
          <Route path="/products/drone" element={<DronePage />} />
          <Route path="/products/edge-box" element={<EdgeBoxPage />} />
          <Route path="/products/edge_box" element={<EdgeBoxPage />} />
          <Route path="/products/safety" element={<SensorsPage />} />
          <Route path="/products/sensors" element={<SensorsPage />} />
          <Route path="/products/server" element={<ServerPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer displayed on every page */}
      <Footer />
    </div>
  );
}
