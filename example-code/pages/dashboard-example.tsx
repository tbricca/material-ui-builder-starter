import React from 'react';
import { Box, Container, Typography, Alert, Paper, Stack, Chip } from '@mui/material';
import { Dashboard as DashboardIcon, Code as CodeIcon } from '@mui/icons-material';
import CrmMainDashboard from '../../crm/components/CrmMainDashboard';
import ExampleNavigation from '../../components/ExampleNavigation';

export default function DashboardExample() {
  return (
    <Box>
      <ExampleNavigation />
      <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Example Header */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DashboardIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h1">
            Dashboard Example
          </Typography>
        </Box>

        <Alert severity="info" sx={{ maxWidth: 800 }}>
          <Typography variant="body2">
            <strong>This is a complete CRM dashboard example</strong> showing real-world patterns:
            analytics cards, interactive charts, data tables, and responsive layouts.
            Use this as a reference for building production dashboards.
          </Typography>
        </Alert>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            icon={<CodeIcon />}
            label="React Query"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<CodeIcon />}
            label="Material-UI Charts"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<CodeIcon />}
            label="Responsive Grid"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<CodeIcon />}
            label="Mock Data"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<CodeIcon />}
            label="Loading States"
            variant="outlined"
            size="small"
          />
        </Stack>
      </Stack>

      {/* Key Learning Points */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Key Patterns Demonstrated
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>StatCard Components:</strong> Reusable metric cards with trend indicators and sparkline charts
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Interactive Charts:</strong> Bar charts, pie charts with Material-UI X Charts integration
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Data Tables:</strong> Sortable tables with pagination and row actions
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Responsive Layout:</strong> Grid system that adapts to different screen sizes
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Mock Data Integration:</strong> Service layer with realistic sample data
            </Typography>
          </li>
        </Box>
      </Paper>

      {/* Live Dashboard */}
      <Paper sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
          <Typography variant="h6">Live Dashboard Example</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Interactive dashboard with real components and data flows
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <CrmMainDashboard />
        </Box>
      </Paper>

      {/* Code Reference */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Component Files
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Main component: <code>src/crm/components/CrmMainDashboard.tsx</code><br />
          StatCard: <code>src/dashboard/components/StatCard.tsx</code><br />
          Charts: <code>src/crm/components/CrmSalesChart.tsx</code><br />
          Tables: <code>src/crm/components/CrmRecentDealsTable.tsx</code>
        </Typography>
      </Paper>
      </Container>
    </Box>
  );
}
