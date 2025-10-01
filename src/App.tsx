import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from "@mui/material/CssBaseline";

// Context providers
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";

// Loading screen
import LoadingScreen from "./components/LoadingScreen";

// Create a React Query client with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <CssBaseline enableColorScheme />
          <LoadingScreen message="Setting things up…" showFallback={false} />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
