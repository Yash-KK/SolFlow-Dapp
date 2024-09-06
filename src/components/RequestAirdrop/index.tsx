import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const RequestAirdrop: React.FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  async function requestAirdrop(): Promise<void> {
    if (wallet.publicKey && amount) {
      const solAmount = parseFloat(amount) * LAMPORTS_PER_SOL;
      try {
        await connection.requestAirdrop(wallet.publicKey, solAmount);
        setSnackbarMessage(
          `Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`
        );
        setAmount("");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        setAmount("");
        setSnackbarMessage(`Airdrop failed: ${error}`);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage(
        "Please enter a valid amount and ensure your wallet is connected."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        borderRadius: "15px",
        padding: "40px",
        textAlign: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#00FFFF",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Request Airdrop
      </Typography>

      <TextField
        id="amount"
        label="Amount (SOL)"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter SOL amount"
        fullWidth
        sx={{
          marginBottom: "20px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#00FFFF",
            },
            "&:hover fieldset": {
              borderColor: "#00FFFF",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiFormLabel-root": {
            color: "white",
          },
        }}
      />

      <Button
        variant="contained"
        onClick={requestAirdrop}
        sx={{
          backgroundColor: "#00FFFF", // Neon cyan button
          color: "#121212", // Dark text color
          fontWeight: "bold",
          padding: "12px 24px",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#00CED1", // Slightly lighter cyan on hover
          },
        }}
      >
        Request Airdrop
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
