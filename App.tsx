import React from 'react';
import { Calendar, Guitar as Hospital, Pill, FileText, MessageSquare, Menu } from 'lucide-react';
import AppointmentScheduler from './components/AppointmentScheduler';
import BedAllotment from './components/BedAllotment';
import MedicineSuggestions from './components/MedicineSuggestions';
import MedicalRecords from './components/MedicalRecords';
import Navigation from './components/Navigation';
import Emergency from './Components/Emergency/Emergency.jsx';
import Navbar from './Components/Navbar/Navbar.tsx';
import Tabfind from './Components/Tabfind/Tabfind.tsx';

function App() {
  const [activeTab, setActiveTab] = React.useState('appointments');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Hospital className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">EmAI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="md:hidden">
              <Menu className="h-6 w-6" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'appointments' && <AppointmentScheduler />}
        {activeTab === 'beds' && <BedAllotment />}
        {activeTab === 'medicines' && <MedicineSuggestions />}
        {activeTab === 'records' && <MedicalRecords />}
        {activeTab === 'Emergency' && <Emergency />}
        {activeTab === 'Navbar' && <Navbar />}
        {activeTab === 'Tabfind' && <Tabfind />}
      </main>
    </div>
  );
}

export default App;