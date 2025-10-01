import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Alert,
  Paper,
  Stack,
  Chip,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormLabel,
  Grid,
  Divider,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Description as FormIcon, Code as CodeIcon, CheckCircle } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import ExampleNavigation from '../../components/ExampleNavigation';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  department: string;
  startDate: Dayjs | null;
  employmentType: string;
  skills: string[];
  experience: string;
  newsletter: boolean;
  terms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const skillOptions = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Design',
  'Product Management',
  'Marketing',
  'Sales',
];

const departments = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'Support',
  'Operations',
  'Finance',
];

export default function FormsExample() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    department: '',
    startDate: null,
    employmentType: 'full-time',
    skills: [],
    experience: '',
    newsletter: false,
    terms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    // Phone validation (optional but format check if provided)
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any } }
  ) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: event.target.checked }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillsChange = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          department: '',
          startDate: null,
          employmentType: 'full-time',
          skills: [],
          experience: '',
          newsletter: false,
          terms: false,
        });
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Example Header */}
        <Stack spacing={3} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h4" component="h1">
              Forms & Validation Example
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              <strong>Complex form with validation patterns</strong> demonstrating real-world form handling:
              field validation, error states, loading states, and user feedback.
            </Typography>
          </Alert>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip icon={<CodeIcon />} label="Form Validation" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Error Handling" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Loading States" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Date Picker" variant="outlined" size="small" />
            <Chip icon={<CodeIcon />} label="Multi-select" variant="outlined" size="small" />
          </Stack>
        </Stack>

        {/* Live Form */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Employee Registration Form
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Fill out all required fields to see validation in action
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>

              {/* Employment Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Employment Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  error={!!errors.company}
                  helperText={errors.company}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position"
                  value={formData.position}
                  onChange={handleInputChange('position')}
                  error={!!errors.position}
                  helperText={errors.position}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.department}>
                  <InputLabel>Department *</InputLabel>
                  <Select
                    value={formData.department}
                    onChange={handleInputChange('department')}
                    label="Department *"
                  >
                    {departments.map(dept => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.department && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.department}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date *"
                  value={formData.startDate}
                  onChange={(newValue) => {
                    setFormData(prev => ({ ...prev, startDate: newValue }));
                    if (errors.startDate) {
                      setErrors(prev => ({ ...prev, startDate: '' }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.startDate,
                      helperText: errors.startDate,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Employment Type</FormLabel>
                  <RadioGroup
                    row
                    value={formData.employmentType}
                    onChange={handleInputChange('employmentType')}
                  >
                    <FormControlLabel value="full-time" control={<Radio />} label="Full-time" />
                    <FormControlLabel value="part-time" control={<Radio />} label="Part-time" />
                    <FormControlLabel value="contract" control={<Radio />} label="Contract" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Skills */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Skills & Experience
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Select your skills:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skillOptions.map(skill => (
                    <Chip
                      key={skill}
                      label={skill}
                      clickable
                      color={formData.skills.includes(skill) ? 'primary' : 'default'}
                      onClick={() => handleSkillsChange(skill)}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Experience & Notes"
                  multiline
                  rows={4}
                  value={formData.experience}
                  onChange={handleInputChange('experience')}
                  placeholder="Tell us about your experience and any additional notes..."
                />
              </Grid>

              {/* Agreements */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.newsletter}
                        onChange={handleCheckboxChange('newsletter')}
                      />
                    }
                    label="Subscribe to newsletter and updates"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.terms}
                        onChange={handleCheckboxChange('terms')}
                        color={errors.terms ? 'error' : 'primary'}
                      />
                    }
                    label="I accept the terms and conditions *"
                  />
                  {errors.terms && (
                    <Typography variant="caption" color="error">
                      {errors.terms}
                    </Typography>
                  )}
                </Stack>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <CheckCircle />}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Code Reference */}
        <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Form Patterns Demonstrated
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Real-time Validation:</strong> Errors clear as user types, immediate feedback
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Multiple Input Types:</strong> Text, email, select, date picker, checkboxes, radio buttons
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Loading States:</strong> Disabled form during submission with loading indicator
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Error Handling:</strong> Field-level and form-level error messages
              </Typography>
            </li>
            <li>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>User Feedback:</strong> Success states and form reset after submission
              </Typography>
            </li>
          </Box>
        </Paper>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={4000}
          onClose={() => setShowSuccess(false)}
          message="Form submitted successfully! 🎉"
        />
      </Container>
    </LocalizationProvider>
  );
}
