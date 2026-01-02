import { ipcLink } from "trpc-electron/renderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc.client";
import React from "react";

/** Wraps the app with TRPC and React Query's context providers */
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [ipcLink()],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
