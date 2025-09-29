# AI Agent Instructions for Fusion CRM Starter

This file provides guidance for AI agents working with this Fusion starter template. Follow these conventions and patterns when generating or modifying code.

## 🏗️ Project Structure

```
src/
├── components/          # Shared UI components (from design system)
├── contexts/           # React Context providers (auth, app state)
├── crm/               # CRM feature components and pages
│   ├── components/    # CRM-specific components
│   └── pages/         # CRM pages (Dashboard, Customers, Settings)
├── hooks/             # Custom React hooks (data fetching, utilities)
├── services/          # API services and data fetching logic
├── shared-theme/      # Material-UI theme configuration
├── sign-in/           # Authentication components
└── types/             # TypeScript type definitions
```

## 🎨 Design System

### Available Components
Refer to `design-system-docs/` for comprehensive component documentation. Key components include:

- **Layout**: `Container`, `Grid`, `Flex`, `Sidebar`
- **Navigation**: `Navigation`, `MenuButton`, `MenuContent`
- **Data Display**: `Table`, `Card`, `StatCard`, `Chart`, `PieChart`
- **Forms**: `Input`, `Select`, `Checkbox`, `Toggle`, `Button`
- **Feedback**: `Message`, `Modal`, `ProgressBar`

### Component Usage Rules
1. **Always check design-system-docs first** - Each component has detailed MDX documentation
2. **Use Material-UI as the foundation** - All components are built on MUI
3. **Follow existing patterns** - Look at CRM components for implementation examples
4. **Maintain theming** - Use the shared theme system in `src/shared-theme/`

## 🔄 Data Fetching Patterns

### React Query (TanStack Query)
Always use React Query for data fetching:

```typescript
// ✅ Correct - Use custom hooks
import { useCustomers } from '../hooks/useCustomers';

function CustomerList() {
  const { data, isLoading, error } = useCustomers({ status: 'active' });
  // ...
}
```

### Service Layer
API calls should go through the service layer:

```typescript
// ✅ Correct - Service pattern
import { customerService } from '../services/customerService';

// Create a hook that uses the service
export function useCreateCustomer() {
  return useMutation({
    mutationFn: customerService.createCustomer,
    // ...
  });
}
```

### Key Patterns
1. **Use custom hooks** - Don't call services directly in components
2. **Implement optimistic updates** - For better UX
3. **Handle loading/error states** - Always show appropriate UI states
4. **Use query keys properly** - For cache invalidation

## 🏛️ State Management

### React Context
Use React Context for global state:

```typescript
// ✅ Authentication state
import { useAuth } from '../contexts/AuthContext';

// ✅ Application settings
import { useApp } from '../contexts/AppContext';
```

### Local State
Use React hooks for component-local state:

```typescript
// ✅ Local state pattern
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState(initialData);
```

## 🎯 Component Creation Guidelines

### File Naming
- **Components**: PascalCase (`CustomerList.tsx`)
- **Hooks**: camelCase with "use" prefix (`useCustomers.ts`)
- **Services**: camelCase with "Service" suffix (`customerService.ts`)
- **Types**: PascalCase (`Customer.ts` or in `types/` directory)

### Component Structure
```typescript
// ✅ Standard component structure
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCustomers } from '../hooks/useCustomers';

interface CustomerListProps {
  status?: 'active' | 'inactive';
  onSelectCustomer?: (customer: Customer) => void;
}

export default function CustomerList({ status, onSelectCustomer }: CustomerListProps) {
  const { data: customers, isLoading, error } = useCustomers({ status });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      {/* Component JSX */}
    </Box>
  );
}
```

### Styling Guidelines
1. **Use Material-UI components** - Prefer MUI over custom HTML
2. **Use sx prop for styling** - Follow MUI patterns
3. **Use theme variables** - Access theme through `sx` prop
4. **Responsive design** - Use MUI breakpoints

```typescript
// ✅ Correct styling
<Box sx={{
  p: 2,
  mb: 3,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 1,
  display: { xs: 'block', md: 'flex' }
}}>
```

## 🔐 Authentication & Authorization

### Authentication Pattern
```typescript
// ✅ Check authentication
import { useAuth } from '../contexts/AuthContext';

function ProtectedComponent() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }
  
  return <div>Protected content for {user?.name}</div>;
}
```

### Role-based Access
```typescript
// ✅ Check user roles
const { user } = useAuth();
const canEdit = user?.role === 'admin' || user?.role === 'manager';
```

## 🚀 Performance Best Practices

### React Query Optimization
```typescript
// ✅ Configure stale time and cache time
useQuery({
  queryKey: ['customers', filters],
  queryFn: () => customerService.getCustomers(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000,   // 10 minutes
});
```

### Component Optimization
```typescript
// ✅ Use React.memo for expensive components
export default React.memo(ExpensiveComponent);

// ✅ Use useCallback for stable references
const handleClick = useCallback(() => {
  // handler logic
}, [dependency]);
```

## 🔧 Environment Configuration

### Environment Variables
Use environment variables for configuration:

```typescript
// ✅ Environment variables (use VITE_ prefix)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENABLE_DEBUG = import.meta.env.VITE_ENABLE_DEBUG === 'true';
```

### Available Environment Variables
See `.env.example` for all available configuration options.

## 📝 Code Style

### TypeScript
1. **Always use TypeScript** - No plain JS files
2. **Define interfaces** - For all data structures
3. **Use strict typing** - Avoid `any` type
4. **Export types** - Make them reusable

### Import Organization
```typescript
// ✅ Import order
import React from 'react';                    // React first
import { Box, Typography } from '@mui/material'; // External libraries
import { useCustomers } from '../hooks/useCustomers'; // Internal hooks/services
import { Customer } from '../types/Customer';   // Types
import CustomerCard from './CustomerCard';     // Local components
```

## 🧪 Testing Patterns

### Component Testing
```typescript
// ✅ Test component behavior
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CustomerList from './CustomerList';

test('renders customer list', () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <CustomerList />
    </QueryClientProvider>
  );
  // assertions
});
```

## 🚫 Common Mistakes to Avoid

1. **Don't bypass the service layer** - Always use services for API calls
2. **Don't mutate state directly** - Use setState or reducers
3. **Don't forget error boundaries** - Handle errors gracefully
4. **Don't use inline styles** - Use sx prop or styled components
5. **Don't ignore loading states** - Always show loading indicators
6. **Don't hardcode values** - Use environment variables or constants

## 📚 Key Files to Reference

### For new components:
- `src/crm/components/CrmMainDashboard.tsx` - Dashboard patterns
- `src/crm/pages/Customers.tsx` - Page structure
- `design-system-docs/` - Component documentation

### For data fetching:
- `src/hooks/useCustomers.ts` - React Query patterns
- `src/services/customerService.ts` - Service patterns

### For theming:
- `src/shared-theme/AppTheme.tsx` - Theme configuration
- `src/shared-theme/themePrimitives.ts` - Design tokens

## 🎯 Next Steps for New Features

When adding new features:

1. **Create the service first** - Define API interactions
2. **Create custom hooks** - Wrap service calls with React Query
3. **Build components** - Using design system components
4. **Add to routing** - Update CrmDashboard routes if needed
5. **Update navigation** - Add menu items if applicable

Remember: This is a starter template focused on demonstrating patterns and best practices for building scalable CRM applications with modern React, TypeScript, and Material-UI.
