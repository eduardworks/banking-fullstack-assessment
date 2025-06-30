import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import Navigation from "./pages/Navigation";

function App() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    document.title = "My Bank";
  }, []);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Navigation token={token} onLogout={handleLogout} />;
}

export default App;
