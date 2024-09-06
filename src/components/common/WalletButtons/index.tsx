import Box from "@mui/material/Box";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React from "react";

export const WalletButtons: React.FC = () => {
  return (
    <Box
      sx={{
        flex: "0.3",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)", 
      }}
    >
      <div>
        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <WalletMultiButton />
        </div>
        <WalletDisconnectButton />
      </div>
    </Box>
  );
};
