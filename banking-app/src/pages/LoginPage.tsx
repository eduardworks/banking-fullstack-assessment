import React, { useState } from "react";
import { TextField, Button, Alert, Typography, Paper } from "@mui/material";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Login failed");
        return;
      }

      const data = await res.json();
      onLogin(data.token);
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Paper elevation={3} className="p-8 w-80">
        <Typography variant="h5" className="text-center mb-6">
          Login
        </Typography>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log In
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
