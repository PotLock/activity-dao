import React, { useState } from 'react';
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const createWalletConfig = () => {
  const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
  return createConfig(
    getDefaultConfig({
      chains: [base],
      transports: {
        // Public Base RPC fallback keeps read-only community browsing functional
        // even if the optional Alchemy integration is not configured.
        [base.id]: http(alchemyId
          ? `https://base-mainnet.g.alchemy.com/v2/${alchemyId}`
          : undefined),
      },
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
      appName: "ActivityDAO",
      appDescription: "Community-led activities, funding and participation",
      appUrl: "https://activity-dao-omega.vercel.app",
      appIcon: "https://activity-dao-omega.vercel.app/favicon.ico",
    })
  );
};

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config] = useState(createWalletConfig);
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};