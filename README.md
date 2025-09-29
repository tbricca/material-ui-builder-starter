# Fusion CRM Starter Template

A production-ready CRM starter template built with React, TypeScript, Material-UI, and modern development practices. Perfect for building scalable customer relationship management applications with Builder.io Fusion.

## ✨ Features

- **🏗️ Modern Stack**: React 18 + TypeScript + Vite
- **🎨 Material Design**: Material-UI v7 with custom theming
- **📊 Dashboard**: Pre-built CRM dashboard with charts and analytics
- **👥 Customer Management**: Full CRUD operations with data tables
- **🔐 Authentication**: Context-based auth system (ready for integration)
- **🔄 Data Fetching**: TanStack React Query with optimistic updates
- **🎯 State Management**: React Context + useReducer patterns
- **📱 Responsive**: Mobile-first responsive design
- **🛠️ Developer Experience**: Hot reload, TypeScript, ESLint, Prettier
- **📚 Documentation**: Comprehensive component docs and AI guidelines

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd fusion-crm-starter

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## 📁 Project Structure

```
src/
├── components/          # Shared UI components (design system)
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   └── AppContext.tsx  # Application settings and notifications
├── crm/               # CRM application
│   ├── components/    # CRM-specific components
│   ├── pages/         # CRM pages (Dashboard, Customers, Settings)
│   └── CrmDashboard.tsx # Main CRM layout
├── hooks/             # Custom React hooks
│   └── useCustomers.ts # Customer data fetching hooks
├── services/          # API services and data layer
│   ├── api.ts         # Axios configuration and interceptors
│   └── customerService.ts # Customer API service
├── shared-theme/      # Material-UI theme configuration
├── sign-in/           # Authentication UI
└── types/             # TypeScript type definitions

design-system-docs/    # Component documentation (MDX files)
├── AGENTS.md          # Design system overview
└── [component].mdx    # Individual component docs
```

## 🎯 Core Features

### 📊 Dashboard
- Executive overview with key metrics
- Interactive charts and data visualizations
- Responsive grid layout
- Real-time data updates

### 👥 Customer Management
- Customer list with filtering and search
- Detailed customer profiles
- CRUD operations with optimistic updates
- Data table with sorting and pagination

### 🔐 Authentication
- Context-based authentication system
- Protected routes and role-based access
- Mock authentication (ready for real integration)
- Logout and session management

### 🎨 Design System
- 30+ documented UI components
- Consistent Material Design patterns
- Dark/light theme support
- Responsive breakpoints

## 💡 Development Guide

### Adding New Features

1. **API Integration**: Start by updating `src/services/` with your API endpoints
2. **Data Hooks**: Create custom hooks in `src/hooks/` using React Query
3. **UI Components**: Build components using the design system in `design-system-docs/`
4. **Pages**: Add new pages to `src/crm/pages/` and update routing
5. **Navigation**: Update `src/crm/components/CrmMenuContent.tsx` for new menu items

### Data Fetching Pattern

```typescript
// 1. Define the service
export const customerService = {
  getCustomers: (filters) => apiClient.get('/customers', { params: filters }),
  // ...
};

// 2. Create React Query hook
export function useCustomers(filters) {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: () => customerService.getCustomers(filters),
  });
}

// 3. Use in component
function CustomerList() {
  const { data, isLoading, error } = useCustomers({ status: 'active' });
  // ...
}
```

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
VITE_API_BASE_URL=https://your-api.com
VITE_API_TIMEOUT=5000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🎨 Design System

The starter includes a comprehensive design system documented in `design-system-docs/`. Key components:

- **Layout**: Container, Grid, Flex, Sidebar
- **Navigation**: MenuButton, MenuContent, Breadcrumbs
- **Data Display**: Table, Card, StatCard, Charts
- **Forms**: Input, Select, Checkbox, Button
- **Feedback**: Modal, Message, ProgressBar

Each component has detailed documentation with usage examples, props, and best practices.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

The built files in `dist/` can be deployed to any static hosting service:

- **Netlify**: Connect your repository and set build command to `npm run build`
- **Vercel**: Import project and deploy with default settings
- **AWS S3/CloudFront**: Upload `dist/` contents to S3 bucket

### Environment Variables for Production

Set these environment variables in your hosting platform:

```bash
VITE_API_BASE_URL=https://your-production-api.com
VITE_AUTH_DOMAIN=your-auth-domain.com
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🤖 AI Development

This starter is optimized for AI-assisted development with Builder.io Fusion:

- **AGENTS.md**: Comprehensive AI guidelines and patterns
- **Design System Docs**: Component documentation for AI reference
- **Code Patterns**: Consistent patterns for AI to learn from
- **TypeScript**: Strong typing for better AI code generation

## 🛠️ Customization

### Theming

Customize the theme in `src/shared-theme/`:

```typescript
// src/shared-theme/themePrimitives.ts
export const brand = {
  50: '#E3F2FD',   // Customize brand colors
  100: '#BBDEFB',
  // ...
};
```

### Components

Extend or create new components following the patterns in `src/components/` and document them in `design-system-docs/`.

### API Integration

Replace mock services in `src/services/` with real API calls:

```typescript
// Replace mock implementation
export const customerService = {
  getCustomers: async (filters) => {
    const response = await apiClient.get('/customers', { params: filters });
    return response.data;
  },
};
```

## 📚 Learning Resources

- [Material-UI Documentation](https://mui.com/)
- [TanStack Query Guide](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- 📖 [Documentation](./AGENTS.md)
- 💬 [Discussions](https://github.com/your-repo/discussions)
- 🐛 [Issues](https://github.com/your-repo/issues)
- 📧 [Email Support](mailto:support@yourcompany.com)

---

Built with ❤️ for the Builder.io Fusion community.
