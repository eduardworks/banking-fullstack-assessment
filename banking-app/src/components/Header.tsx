import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Banking App
        </Typography>
        <IconButton color="inherit" onClick={onLogout} aria-label="logout">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
