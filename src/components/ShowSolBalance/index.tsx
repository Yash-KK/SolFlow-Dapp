import { useEffect, useState } from "react";
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

export const ShowSolBalance: React.FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [text, setText] = useState<any>("");
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    if (wallet.publicKey) {
      setText(wallet.publicKey.toBase58());
    } else {
      setText("");
      setSolBalance(null);
    }
  }, [wallet.publicKey]);

  async function showBalance(): Promise<void> {
    if (wallet.publicKey) {
      const lamportBalance = await connection.getBalance(wallet.publicKey);
      const solBalance = lamportBalance / LAMPORTS_PER_SOL;
      setSolBalance(solBalance);
    } else {
      setSnackbarMessage("Ensure your wallet is connected.");
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
        Show Solana Balance
      </Typography>

      <TextField
        id="text"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        disabled
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
          "& .Mui-disabled": {
            color: "white",
            "-webkit-text-fill-color": "white",
          },
        }}
      />

      {solBalance !== null && (
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Your Devnet balance is{" "}
          <span style={{ fontWeight: "bold", color: "#00FFFF" }}>
            {solBalance.toFixed(4)} SOL
          </span>
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={showBalance}
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
        Display
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
