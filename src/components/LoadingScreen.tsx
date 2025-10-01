import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

interface LoadingScreenProps {
  message?: string;
  showFallback?: boolean;
  fallbackDelay?: number;
}

export default function LoadingScreen({ 
  message = "Setting things up…",
  showFallback = true,
  fallbackDelay = 5000
}: LoadingScreenProps) {
  const [showSlowConnectionMessage, setShowSlowConnectionMessage] = useState(false);

  useEffect(() => {
    if (!showFallback) return;

    const timer = setTimeout(() => {
      setShowSlowConnectionMessage(true);
    }, fallbackDelay);

    return () => clearTimeout(timer);
  }, [showFallback, fallbackDelay]);

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label="Loading application"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box
          aria-label="Loading spinner"
          role="img"
          sx={{
            width: 48,
            height: 48,
            border: '4px solid',
            borderColor: 'divider',
            borderTopColor: 'primary.main',
            borderRadius: '50%',
            animation: `${spin} 1s linear infinite`,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            fontWeight: 500,
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        >
          {message}
        </Typography>

        {showSlowConnectionMessage && (
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              maxWidth: 300,
              mt: 1,
            }}
          >
            If this takes longer than usual, please check your connection.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
