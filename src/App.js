import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import './App.css';
import Servers from './pages/servers/Servers';
import Login from './pages/login/Login';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return null;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <Navbar user={user} />
      <body>
        <Servers></Servers>
      </body>
    </div>
  );
}

export default App;
