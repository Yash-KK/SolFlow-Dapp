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
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const SendSol: React.FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [toPublicKey, setToPublicKey] = useState<any>("");
  const [sendSolana, setSendSolana] = useState<any>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  async function sendSol(): Promise<void> {
    const transaction = new Transaction();
    try {
      if (wallet.publicKey) {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(toPublicKey),
            lamports: sendSolana * LAMPORTS_PER_SOL,
          })
        );

        await wallet.sendTransaction(transaction, connection);
        setSnackbarMessage(`Sent ${sendSolana} SOL to ${toPublicKey}`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setSendSolana("");
        setToPublicKey("");
      } else {
        setSnackbarMessage("Ensure your wallet is connected.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);

        setSendSolana("");
        setToPublicKey("");
      }
    } catch (error) {
      setSnackbarMessage(`Transaction failed: ${error}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);

      setSendSolana("");
      setToPublicKey("");
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
        Send Solana
      </Typography>

      <TextField
        id="amount"
        label="To..."
        variant="outlined"
        value={toPublicKey}
        onChange={(e) => setToPublicKey(e.target.value)}
        placeholder="Enter address"
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
      <TextField
        id="amount"
        label="Amount (SOL)"
        variant="outlined"
        value={sendSolana}
        onChange={(e) => setSendSolana(e.target.value)}
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
        onClick={sendSol}
        sx={{
          backgroundColor: "#00FFFF",
          color: "#121212",
          fontWeight: "bold",
          padding: "12px 24px",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#00CED1",
          },
        }}
      >
        Send
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
