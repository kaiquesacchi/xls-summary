import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import NiceModal from "@ebay/nice-modal-react";
import { TRPCProvider } from "./utils/trpc/TrpcProvider";

const root = document.getElementById("root");
if (!root) throw new Error("No `root` element found");
createRoot(root).render(
  <StrictMode>
    <TRPCProvider>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </TRPCProvider>
  </StrictMode>,
);
