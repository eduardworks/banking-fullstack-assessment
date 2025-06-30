import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

interface SidebarProps {
  onLogout: () => void;
  onMenuClick?: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, onMenuClick }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-blue-900 text-white flex flex-col justify-between shadow-lg">
      <div>
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-blue-800">
          MyBank
        </div>
        <nav>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onMenuClick && onMenuClick("Transactions")}
              >
                <ListItemIcon>
                  <PaymentIcon className="text-white" />
                </ListItemIcon>
                <ListItemText
                  primary="Transactions"
                  primaryTypographyProps={{ className: "text-white" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </div>

      <div className="p-4 border-t border-blue-800">
        <Button
          variant="outlined"
          fullWidth
          className="text-white border-white hover:bg-blue-800"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
