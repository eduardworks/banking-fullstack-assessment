import {
  Alert,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
}

interface TransactionTableProps {
  token: string;
}

const TransactionPage: React.FC<TransactionTableProps> = ({ token }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:8080/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  const showSnackbar = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleAdd = async () => {
    if (!desc || amount <= 0 || !date) return;

    const res = await fetch("http://localhost:8080/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description: desc, amount, date }),
    });

    if (res.ok) {
      setDate("");
      setDesc("");
      setAmount(0);
      fetchTransactions();
      showSnackbar("Transaction added successfully!");
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/transactions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      showSnackbar("Transaction deleted successfully!");
      fetchTransactions();
    }
  };

  return (
    <div className="p-8">
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      <Paper elevation={3} className="p-6 mb-8">
        <Typography variant="h6" gutterBottom>
          Add Transaction
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
        >
          <TextField
            label="Description"
            variant="outlined"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
            size="small"
            className="col-span-1 md:col-span-2"
          />
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
            size="small"
            className="col-span-1"
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            className="col-span-1"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="col-span-1"
          >
            Add
          </Button>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        All Transactions
      </Typography>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <Typography color="textSecondary">No transactions yet.</Typography>
        ) : (
          transactions.map((tx) => (
            <Paper
              key={tx.id}
              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2"
            >
              <div>
                <Typography variant="subtitle1">{tx.description}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(tx.date).toLocaleDateString()}
                </Typography>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Typography
                  variant="subtitle1"
                  className={tx.amount < 0 ? "text-red-600" : "text-green-600"}
                >
                  ${tx.amount.toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(tx.id)}
                  className="text-white"
                >
                  Delete
                </Button>
              </div>
            </Paper>
          ))
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TransactionPage;
