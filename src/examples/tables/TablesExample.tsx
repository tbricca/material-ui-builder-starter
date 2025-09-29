import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Alert,
  Paper,
  Stack,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
  Fab,
  Snackbar,
  Avatar,
  InputAdornment,
} from '@mui/material';
import {
  TableChart as TableIcon,
  Code as CodeIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useCustomers } from '../../hooks/useCustomers';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  totalValue: number;
  lastContact: string;
  avatar?: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    status: 'active',
    totalValue: 45000,
    lastContact: '2024-01-20',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@techstart.io',
    phone: '+1 (555) 987-6543',
    company: 'TechStart Inc.',
    status: 'prospect',
    totalValue: 12000,
    lastContact: '2024-01-19',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mike@globalsolutions.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Solutions Ltd.',
    status: 'active',
    totalValue: 78500,
    lastContact: '2024-01-18',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@innovate.com',
    phone: '+1 (555) 321-0987',
    company: 'Innovate Corp',
    status: 'inactive',
    totalValue: 23000,
    lastContact: '2024-01-15',
    avatar: 'https://i.pravatar.cc/40?img=4',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@startupxyz.com',
    phone: '+1 (555) 654-3210',
    company: 'StartupXYZ',
    status: 'prospect',
    totalValue: 8500,
    lastContact: '2024-01-17',
    avatar: 'https://i.pravatar.cc/40?img=5',
  },
];

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Customer;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Customer' },
  { id: 'company', numeric: false, disablePadding: false, label: 'Company' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'totalValue', numeric: true, disablePadding: false, label: 'Total Value' },
  { id: 'lastContact', numeric: false, disablePadding: false, label: 'Last Contact' },
];

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const statusColors = {
  active: 'success',
  inactive: 'error',
  prospect: 'warning',
} as const;

export default function TablesExample() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Customer>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Dialog states
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleRequestSort = (property: keyof Customer) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, customer: Customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer({ ...customer });
    setEditDialog(true);
    handleMenuClose();
  };

  const handleDelete = (customer: Customer) => {
    setDeletingCustomer(customer);
    setDeleteDialog(true);
    handleMenuClose();
  };

  const handleSaveEdit = () => {
    if (editingCustomer) {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? editingCustomer : c));
      setSnackbar({ open: true, message: 'Customer updated successfully!' });
    }
    setEditDialog(false);
    setEditingCustomer(null);
  };

  const handleConfirmDelete = () => {
    if (deletingCustomer) {
      setCustomers(prev => prev.filter(c => c.id !== deletingCustomer.id));
      setSnackbar({ open: true, message: 'Customer deleted successfully!' });
    }
    setDeleteDialog(false);
    setDeletingCustomer(null);
  };

  const handleAddNew = () => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: 'New Customer',
      email: 'new@example.com',
      phone: '+1 (555) 000-0000',
      company: 'New Company',
      status: 'prospect',
      totalValue: 0,
      lastContact: new Date().toISOString().split('T')[0],
    };
    setEditingCustomer(newCustomer);
    setEditDialog(true);
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = stableSort(filteredCustomers, getComparator(order, orderBy));
  const paginatedCustomers = sortedCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Example Header */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TableIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h1">
            Data Tables Example
          </Typography>
        </Box>

        <Alert severity="info">
          <Typography variant="body2">
            <strong>Advanced data table with CRUD operations</strong> demonstrating sorting, filtering,
            pagination, search, and inline editing patterns commonly used in admin interfaces.
          </Typography>
        </Alert>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip icon={<CodeIcon />} label="Table Sorting" variant="outlined" size="small" />
          <Chip icon={<CodeIcon />} label="Pagination" variant="outlined" size="small" />
          <Chip icon={<CodeIcon />} label="Search & Filter" variant="outlined" size="small" />
          <Chip icon={<CodeIcon />} label="CRUD Operations" variant="outlined" size="small" />
          <Chip icon={<CodeIcon />} label="Action Menus" variant="outlined" size="small" />
        </Stack>
      </Stack>

      {/* Table Section */}
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* Toolbar */}
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            Customer Management
          </Typography>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 200 }}
            />
            
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="prospect">Prospect</MenuItem>
            </TextField>

            <Tooltip title="Export Data">
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" padding="none">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 2 }}>
                      <Avatar
                        src={customer.avatar}
                        sx={{ width: 32, height: 32 }}
                      >
                        {customer.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {customer.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>
                    <Chip
                      label={customer.status}
                      color={statusColors[customer.status]}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    ${customer.totalValue.toLocaleString()}
                  </TableCell>
                  <TableCell>{customer.lastContact}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, customer)}
                    >
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddNew}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedCustomer && handleEdit(selectedCustomer)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => selectedCustomer && handleDelete(selectedCustomer)}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCustomer?.id === Date.now().toString() ? 'Add New Customer' : 'Edit Customer'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              value={editingCustomer?.name || ''}
              onChange={(e) => setEditingCustomer(prev => prev ? {...prev, name: e.target.value} : null)}
            />
            <TextField
              fullWidth
              label="Email"
              value={editingCustomer?.email || ''}
              onChange={(e) => setEditingCustomer(prev => prev ? {...prev, email: e.target.value} : null)}
            />
            <TextField
              fullWidth
              label="Phone"
              value={editingCustomer?.phone || ''}
              onChange={(e) => setEditingCustomer(prev => prev ? {...prev, phone: e.target.value} : null)}
            />
            <TextField
              fullWidth
              label="Company"
              value={editingCustomer?.company || ''}
              onChange={(e) => setEditingCustomer(prev => prev ? {...prev, company: e.target.value} : null)}
            />
            <TextField
              select
              fullWidth
              label="Status"
              value={editingCustomer?.status || 'prospect'}
              onChange={(e) => setEditingCustomer(prev => prev ? {...prev, status: e.target.value as Customer['status']} : null)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="prospect">Prospect</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {deletingCustomer?.name}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Code Reference */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Table Patterns Demonstrated
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Sortable Columns:</strong> Click column headers to sort data ascending/descending
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Search & Filter:</strong> Real-time search across multiple fields with status filter
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Pagination:</strong> Configurable page size with navigation controls
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>CRUD Operations:</strong> Create, edit, and delete records with confirmation dialogs
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>User Feedback:</strong> Success messages and loading states for all operations
            </Typography>
          </li>
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Container>
  );
}
