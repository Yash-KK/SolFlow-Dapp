import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import BasicTabs from "./components/Navbar";

function App() {
  const alchemyDevnetEndpoint =
    "https://solana-devnet.g.alchemy.com/v2/QAq5vv2pXwG3I6JhOMEOnhP1MUGKen5s";
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
