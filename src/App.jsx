import React from 'react';

import Dashboard from './components/dashboard/Dashboard';
import HostContext from './contexts/HostContext';
import ServerUpTimer from './resolver/ServerUpTimer';

function App() {
  const host = (import.meta.env.VITE_HOST_URL || 'http://localhost:8080').trim();
  console.log('Host URL:', host);
  const [open, setOpen] = React.useState(false);

  // Check server status on mount
  React.useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${host}/api/status`);
        const data = await res.json();
        setOpen(Boolean(data));
      } catch (err) {
        setOpen(false);
      }
    };
    checkServer();
  }, [host]);

  const activate = () => {
    setOpen(true);
  };

  return (
    <HostContext.Provider value={host}>
      {!open ? <ServerUpTimer onClose={activate} /> : <Dashboard />}
    </HostContext.Provider>
  );
}

export default App;
