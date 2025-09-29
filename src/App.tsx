import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Context providers
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";

// Route components
import Welcome from "./pages/Welcome";
import CrmDashboard from "./crm/CrmDashboard";
import SignIn from "./sign-in/SignIn";

// Example components
import DashboardExample from "./examples/dashboard/DashboardExample";
import FormsExample from "./examples/forms/FormsExample";
import TablesExample from "./examples/tables/TablesExample";
import LayoutsExample from "./examples/layouts/LayoutsExample";

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

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1" color="primary">
        404: Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Typography 
        variant="body2" 
        component="a" 
        href="/" 
        sx={{ 
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        ← Back to Dashboard
      </Typography>
    </Box>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Welcome Page - Default Landing */}
      <Route path="/" element={<Welcome />} />

      {/* Examples Section */}
      <Route path="/examples/dashboard" element={<DashboardExample />} />
      <Route path="/examples/forms" element={<FormsExample />} />
      <Route path="/examples/tables" element={<TablesExample />} />
      <Route path="/examples/layouts" element={<LayoutsExample />} />

      {/* Full CRM Application (for advanced users) */}
      <Route path="/crm/*" element={<CrmDashboard />} />

      {/* Authentication */}
      <Route path="/auth/signin" element={<SignIn />} />

      {/* Redirects */}
      <Route path="/login" element={<Navigate to="/auth/signin" replace />} />
      <Route path="/dashboard" element={<Navigate to="/examples/dashboard" replace />} />

      {/* 404 - Keep this last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <CssBaseline enableColorScheme />
            <AppRoutes />
          </BrowserRouter>
          
          {/* React Query DevTools - only in development */}
          {import.meta.env.DEV && (
            <ReactQueryDevtools 
              initialIsOpen={false} 
              position="bottom-right"
            />
          )}
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
