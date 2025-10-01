# Material UI Starter - Example Code Reference

This directory contains all the example code from the Material UI Starter template, organized for easy reference and reuse.

## 📁 Directory Structure

```
example-code/
└── pages/
    ├── dashboard-example.tsx    # Complete CRM dashboard with charts and analytics
    ├── forms-example.tsx        # Advanced form with validation patterns
    ├── tables-example.tsx       # Data table with CRUD operations
    └── layouts-example.tsx      # Responsive layout patterns
```

## 📚 Page Examples

### 1. Dashboard Example
**File:** `pages/dashboard-example.tsx`

A complete CRM dashboard demonstrating:
- **StatCard Components**: Reusable metric cards with trend indicators and sparkline charts
- **Interactive Charts**: Bar charts, pie charts with Material-UI X Charts integration
- **Data Tables**: Sortable tables with pagination and row actions
- **Responsive Layout**: Grid system that adapts to different screen sizes
- **Mock Data Integration**: Service layer with realistic sample data

**Technologies:**
- React Query
- Material-UI Charts
- Responsive Grid
- Mock Data
- Loading States

---

### 2. Forms Example
**File:** `pages/forms-example.tsx`

Complex form with validation patterns demonstrating:
- **Real-time Validation**: Errors clear as user types, immediate feedback
- **Multiple Input Types**: Text, email, select, date picker, checkboxes, radio buttons
- **Loading States**: Disabled form during submission with loading indicator
- **Error Handling**: Field-level and form-level error messages
- **User Feedback**: Success states and form reset after submission

**Technologies:**
- Form Validation
- Error Handling
- Loading States
- Date Picker (Material-UI X)
- Multi-select

---

### 3. Tables Example
**File:** `pages/tables-example.tsx`

Advanced data table with CRUD operations demonstrating:
- **Sortable Columns**: Click column headers to sort data ascending/descending
- **Search & Filter**: Real-time search across multiple fields with status filter
- **Pagination**: Configurable page size with navigation controls
- **CRUD Operations**: Create, edit, and delete records with confirmation dialogs
- **User Feedback**: Success messages and loading states for all operations

**Technologies:**
- Table Sorting
- Pagination
- Search & Filter
- CRUD Operations
- Action Menus

---

### 4. Layouts Example
**File:** `pages/layouts-example.tsx`

Responsive design patterns and layout systems demonstrating:
- **Mobile-First Approach**: Start with mobile design, then enhance for larger screens
- **Breakpoint System**: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)
- **Flexible Grids**: Use Material-UI Grid system with responsive column spans
- **Adaptive Components**: Components that change layout based on screen size
- **Touch-Friendly**: Larger touch targets and appropriate spacing on mobile

**Layout Patterns Included:**
- Holy Grail Layout
- Card Grid System
- Sidebar Layout
- Dashboard Layout

**Technologies:**
- CSS Grid
- Flexbox
- Breakpoints
- Mobile-First
- Adaptive Cards

---

## 🚀 How to Use These Examples

### 1. Direct Copy
Copy any example file to your project and modify as needed:
```bash
cp example-code/pages/forms-example.tsx src/pages/MyCustomForm.tsx
```

### 2. Reference Implementation
Use these files as reference when building similar features in your project.

### 3. Learn Patterns
Study the patterns and best practices demonstrated in each example:
- Component composition
- State management
- Form validation
- Responsive design
- User feedback

## 🎯 Key Patterns Across All Examples

### State Management
- Local state with `useState`
- Form state with validation
- Loading and error states
- Dialog and menu state

### User Experience
- Real-time validation
- Loading indicators
- Success/error feedback
- Responsive design
- Accessibility

### Material-UI Integration
- Theme customization
- Component variants
- Responsive breakpoints
- Icon usage
- Grid system

## 📖 Related Documentation

- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [Material-UI X Charts](https://mui.com/x/react-charts/)
- [Material-UI X Date Pickers](https://mui.com/x/react-date-pickers/)
- [React Query](https://tanstack.com/query/latest)

## 🔧 Component Files Reference

Main components used in examples:
- `src/crm/components/CrmMainDashboard.tsx` - Dashboard layout
- `src/dashboard/components/StatCard.tsx` - Metric cards
- `src/crm/components/CrmSalesChart.tsx` - Charts
- `src/crm/components/CrmRecentDealsTable.tsx` - Data tables

---

**Note:** All examples use TypeScript and follow Material-UI best practices. They are production-ready and can be used as-is or customized for your specific needs.
