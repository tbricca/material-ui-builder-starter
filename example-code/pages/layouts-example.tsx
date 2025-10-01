import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Alert,
  Paper,
  Stack,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ViewModule as LayoutIcon,
  Code as CodeIcon,
  Menu as MenuIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';

const sampleCards = [
  {
    id: 1,
    title: 'Product Card Example',
    subtitle: 'E-commerce Layout',
    description: 'Responsive product card with image, details, and actions. Adapts to different screen sizes.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    price: '$299',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Blog Post Card',
    subtitle: 'Content Layout',
    description: 'Article preview card with featured image, excerpt, and metadata. Perfect for blog listings.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop',
    author: 'John Doe',
    date: 'Jan 15, 2024',
  },
  {
    id: 3,
    title: 'Profile Card',
    subtitle: 'User Interface',
    description: 'User profile card with avatar, bio, and social actions. Responsive and accessible.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=300&h=200&fit=crop',
    role: 'UI Designer',
    location: 'San Francisco',
  },
  {
    id: 4,
    title: 'Dashboard Widget',
    subtitle: 'Analytics Layout',
    description: 'Metric card with chart visualization. Part of a responsive dashboard grid system.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    metric: '+12.5%',
    period: 'vs last month',
  },
  {
    id: 5,
    title: 'Feature Card',
    subtitle: 'Landing Page',
    description: 'Marketing feature card with icon, title, and description. Used in feature grids.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    features: ['Responsive', 'Accessible', 'Modern'],
  },
  {
    id: 6,
    title: 'Testimonial Card',
    subtitle: 'Social Proof',
    description: 'Customer testimonial with photo, quote, and details. Builds trust and credibility.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    quote: 'This product changed how we work!',
    company: 'Tech Corp',
  },
];

export default function LayoutsExample() {
  const [gridView, setGridView] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const ProductCard = ({ item }: { item: typeof sampleCards[0] }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={item.image}
        alt={item.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.subtitle}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {item.description}
        </Typography>
        {item.price && (
          <Typography variant="h6" color="primary" gutterBottom>
            {item.price}
          </Typography>
        )}
        {item.rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <StarIcon color="warning" fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {item.rating}
            </Typography>
          </Box>
        )}
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1}>
          <Button size="small" startIcon={<FavoriteIcon />}>
            Like
          </Button>
          <Button size="small" startIcon={<ShareIcon />}>
            Share
          </Button>
          {item.price && (
            <Button size="small" variant="contained" startIcon={<CartIcon />}>
              Add to Cart
            </Button>
          )}
        </Stack>
      </Box>
    </Card>
  );

  const ListItemComponent = ({ item }: { item: typeof sampleCards[0] }) => (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={item.image}
          alt={item.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              {item.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {item.subtitle}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {item.description}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
            <Button size="small">View Details</Button>
            {item.price && (
              <Typography variant="h6" color="primary" sx={{ ml: 'auto', mr: 2 }}>
                {item.price}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );

  const DrawerContent = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Grid Layouts', 'Flexbox Patterns', 'Responsive Design', 'Mobile-First', 'Accessibility'].map((text) => (
          <ListItem key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Demo App Bar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Responsive Layout Demo
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={gridView}
                onChange={(e) => setGridView(e.target.checked)}
                color="default"
              />
            }
            label={gridView ? 'Grid' : 'List'}
            sx={{ color: 'inherit' }}
          />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <DrawerContent />
      </Drawer>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Example Header */}
        <Stack spacing={3} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LayoutIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" component="h1">
              Responsive Layouts Example
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              <strong>Responsive design patterns and layout systems</strong> demonstrating Grid, Flexbox,
              mobile-first design, and adaptive components that work across all device sizes.
            </Typography>
          </Alert>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip icon={<CodeIcon />} label="CSS Grid" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Flexbox" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Breakpoints" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Mobile-First" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Adaptive Cards" variant="outlined" size="small" />
          </Stack>
        </Stack>

        {/* Layout Controls */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Layout Controls
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Toggle between grid and list views. Resize your browser to see responsive behavior.
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControlLabel
              control={
                <Switch
                  checked={gridView}
                  onChange={(e) => setGridView(e.target.checked)}
                />
              }
              label={gridView ? 'Grid View' : 'List View'}
            />
            <Typography variant="body2" color="text.secondary">
              Current viewport: {isMobile ? 'Mobile' : 'Desktop'}
            </Typography>
          </Stack>
        </Paper>

        {/* Responsive Content */}
        {gridView ? (
          // Grid Layout
          <Grid container spacing={3}>
            {sampleCards.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.id}
              >
                <ProductCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          // List Layout
          <Box>
            {sampleCards.map((item) => (
              <ListItemComponent key={item.id} item={item} />
            ))}
          </Box>
        )}

        {/* Layout Patterns */}
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Common Layout Patterns
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Holy Grail Layout */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Holy Grail Layout
                  </Typography>
                  <Box sx={{
                    height: 200,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Box sx={{ bgcolor: 'primary.light', p: 1, color: 'white' }}>
                      Header
                    </Box>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                      <Box sx={{ bgcolor: 'secondary.light', p: 1, width: 60, color: 'white' }}>
                        Nav
                      </Box>
                      <Box sx={{ bgcolor: 'background.paper', p: 1, flexGrow: 1 }}>
                        Main Content
                      </Box>
                      <Box sx={{ bgcolor: 'warning.light', p: 1, width: 60, color: 'white' }}>
                        Aside
                      </Box>
                    </Box>
                    <Box sx={{ bgcolor: 'grey.400', p: 1, color: 'white' }}>
                      Footer
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Card Grid */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Card Grid System
                  </Typography>
                  <Grid container spacing={1} sx={{ height: 200 }}>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: 'primary.light', height: '100%', borderRadius: 1, p: 1, color: 'white' }}>
                        Card 1
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: 'secondary.light', height: '100%', borderRadius: 1, p: 1, color: 'white' }}>
                        Card 2
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ bgcolor: 'success.light', height: 75, borderRadius: 1, p: 1, color: 'white' }}>
                        Card 3
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box sx={{ bgcolor: 'warning.light', height: 75, borderRadius: 1, p: 1, color: 'white' }}>
                        Card 4
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar Layout */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sidebar Layout
                  </Typography>
                  <Box sx={{
                    height: 200,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex'
                  }}>
                    <Box sx={{
                      bgcolor: 'grey.200',
                      width: 80,
                      p: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Box sx={{ bgcolor: 'primary.main', height: 20, borderRadius: 0.5 }} />
                      <Box sx={{ bgcolor: 'primary.light', height: 20, borderRadius: 0.5 }} />
                      <Box sx={{ bgcolor: 'primary.light', height: 20, borderRadius: 0.5 }} />
                    </Box>
                    <Box sx={{
                      flexGrow: 1,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <Box sx={{ bgcolor: 'grey.100', height: 30, borderRadius: 1 }} />
                      <Box sx={{ bgcolor: 'grey.50', height: 50, borderRadius: 1 }} />
                      <Box sx={{ bgcolor: 'grey.50', height: 30, borderRadius: 1 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Dashboard Layout */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Dashboard Layout
                  </Typography>
                  <Grid container spacing={1} sx={{ height: 200 }}>
                    <Grid item xs={12}>
                      <Box sx={{ bgcolor: 'info.light', height: 30, borderRadius: 1, p: 1, color: 'white' }}>
                        Header Bar
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box sx={{ bgcolor: 'success.light', height: 60, borderRadius: 1, p: 1, color: 'white' }}>
                        Main Chart
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ bgcolor: 'warning.light', height: 60, borderRadius: 1, p: 1, color: 'white' }}>
                        Metrics
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: 'error.light', height: 80, borderRadius: 1, p: 1, color: 'white' }}>
                        Table
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: 'purple', height: 80, borderRadius: 1, p: 1, color: 'white' }}>
                        Activity
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Code Reference */}
        <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Responsive Design Patterns
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Mobile-First Approach:</strong> Start with mobile design, then enhance for larger screens
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Breakpoint System:</strong> xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Flexible Grids:</strong> Use Material-UI Grid system with responsive column spans
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Adaptive Components:</strong> Components that change layout based on screen size
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Touch-Friendly:</strong> Larger touch targets and appropriate spacing on mobile
              </Typography>
            </li>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
