import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <DashboardIcon color="primary" />,
    title: 'Pre-built Dashboard',
    description: 'Complete CRM dashboard with charts, tables, and real-world patterns',
  },
  {
    icon: <CodeIcon color="primary" />,
    title: 'Modern Stack',
    description: 'React 18, TypeScript, Material-UI v7, React Query, and Vite',
  },
  {
    icon: <SpeedIcon color="primary" />,
    title: 'Performance Optimized',
    description: 'Optimistic updates, caching, and efficient re-renders out of the box',
  },
  {
    icon: <SecurityIcon color="primary" />,
    title: 'Auth Ready',
    description: 'Context-based authentication with protected routes and role management',
  },
  {
    icon: <PaletteIcon color="primary" />,
    title: 'Design System',
    description: '30+ documented components with consistent Material Design patterns',
  },
  {
    icon: <StorageIcon color="primary" />,
    title: 'Data Patterns',
    description: 'Service layer, custom hooks, and mock APIs ready for real integration',
  },
];

const techStack = [
  'React 18',
  'TypeScript',
  'Material-UI v7',
  'React Query',
  'React Router',
  'Axios',
  'Vite',
  'ESLint',
];

const examples = [
  {
    title: 'CRM Dashboard',
    description: 'Complete dashboard with analytics, charts, and customer management',
    path: '/examples/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Data Tables',
    description: 'Advanced tables with sorting, filtering, and CRUD operations',
    path: '/examples/tables',
    icon: <DashboardIcon />,
  },
  {
    title: 'Forms & Validation',
    description: 'Complex forms with validation, multi-step workflows',
    path: '/examples/forms',
    icon: <CodeIcon />,
  },
  {
    title: 'Responsive Layouts',
    description: 'Grid systems, mobile-first design, and adaptive layouts',
    path: '/examples/layouts',
    icon: <PaletteIcon />,
  },
];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Fusion CRM Starter
              </Typography>
              <Typography variant="h5" component="p" gutterBottom sx={{ opacity: 0.9 }}>
                Production-ready React template with modern patterns and AI-optimized examples
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
                Built for Builder.io Fusion with comprehensive examples, best practices, 
                and patterns that AI can learn from to generate high-quality code.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/examples/dashboard')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                  endIcon={<ArrowIcon />}
                >
                  View Examples
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                  startIcon={<GitHubIcon />}
                >
                  Documentation
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Quick Start
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: 'rgba(0,0,0,0.3)',
                    p: 2,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    overflow: 'auto',
                  }}
                >
                  {`git clone <your-repo>
cd fusion-crm-starter
npm install
npm run dev`}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Everything You Need
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          A complete starter template with production-ready patterns and examples
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Tech Stack */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Modern Tech Stack
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Built with the latest tools and best practices
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                variant="outlined"
                sx={{ fontWeight: 'medium' }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Examples Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Live Examples
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Real-world patterns and components for AI to learn from
        </Typography>

        <Grid container spacing={4}>
          {examples.map((example, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  }
                }}
                onClick={() => navigate(example.path)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Box sx={{ color: 'primary.main' }}>{example.icon}</Box>
                    <Typography variant="h6">{example.title}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {example.description}
                  </Typography>
                  <Button
                    variant="text"
                    endIcon={<ArrowIcon />}
                    sx={{ p: 0, justifyContent: 'flex-start' }}
                  >
                    View Example
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Getting Started */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Getting Started
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Follow these steps to start building with the template
          </Typography>
          
          <Card>
            <CardContent sx={{ p: 4 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Explore the Examples"
                    secondary="Check out the live examples to understand the patterns and components"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Read the Documentation"
                    secondary="Review AGENTS.md and design-system-docs/ for detailed guidance"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Connect Your API"
                    secondary="Replace mock services in src/services/ with your real API endpoints"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Customize the Theme"
                    secondary="Update colors and styles in src/shared-theme/ to match your brand"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Build Your Features"
                    secondary="Use the patterns from examples to create your own components and pages"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
