import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import BasicTabs from "./components/Navbar";

function App() {
  const alchemyDevnetEndpoint =import.meta.env.VITE_APP_SOLANA_DEVNET_API_URL;
  const endpoint = useMemo(() => alchemyDevnetEndpoint, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <BasicTabs />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
