import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { Menu, Settings, Person } from '@mui/icons-material';
import './styles/global.scss';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header className="top-navbar">
        <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu />
        </button>
        <h1 className="app-title">User Management Dashboard</h1>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="nav-links">
          <a href="#" className="nav-item">
            <Person />
            <span>Profile</span>
          </a>
          <a href="#" className="nav-item">
            <Settings />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
