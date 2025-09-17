import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { HomePage } from './pages/HomePage';
import { OrderWizard } from './components/order/OrderWizard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<OrderWizard />} />
            <Route path="/how-it-works" element={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">How it Works - Coming Soon</div>} />
            <Route path="/materials" element={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Materials - Coming Soon</div>} />
            <Route path="/samples" element={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Samples - Coming Soon</div>} />
            <Route path="/testimonials" element={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Testimonials - Coming Soon</div>} />
            <Route path="/contact" element={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Contact - Coming Soon</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;