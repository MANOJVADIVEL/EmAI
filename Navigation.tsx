import React from 'react';
import { Calendar, Bed, Pill, FileText,Ambulance,Warehouse,Tablets } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'Navbar', label: 'Home', icon: Warehouse },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'beds', label: 'Bed Allotment', icon: Bed },
    { id: 'medicines', label: 'Medicine Suggestions', icon: Pill },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'Emergency', label: 'Alert', icon: Ambulance },
    { id: 'Tabfind', label: 'Medicine finder', icon: Tablets },
  ];

  return (
    <div className="navigation-wrapper">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <div key={item.id} className="nav-container">
            <button
              onClick={() => setActiveTab(item.id)}
              className={`nav-button modern ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
            </button>
            {isActive && <span className="nav-float-label">{item.label}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
