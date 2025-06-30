import React, { useState } from "react";
import Header from "../components/Header";
import TransactionPage from "./TransactionPage";
import Sidebar from "../components/SideBar";

const Navigation: React.FC<{ token: string; onLogout: () => void }> = ({
  token,
  onLogout,
}) => {
  const [currentPage, setCurrentPage] = useState("Transactions");

  const renderPage = () => {
    switch (currentPage) {
      case "Transactions":
        return <TransactionPage token={token} />;
      default:
        return <div className="p-8">Page not found.</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={onLogout} onMenuClick={setCurrentPage} />

      <div className="flex-1 ml-60">
        <Header onLogout={onLogout} />
        <main className="p-8">{renderPage()}</main>
      </div>
    </div>
  );
};

export default Navigation;
