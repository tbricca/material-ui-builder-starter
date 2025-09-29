import { apiClient } from './api';

// Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'active' | 'inactive' | 'prospect';
  createdAt: string;
  updatedAt: string;
  totalValue: number;
  lastContact?: string;
}

export interface CustomerFilters {
  status?: Customer['status'];
  search?: string;
  page?: number;
  limit?: number;
}

export interface CustomerResponse {
  customers: Customer[];
  total: number;
  page: number;
  totalPages: number;
}

// Mock data for development
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    totalValue: 45000,
    lastContact: '2024-01-18T09:15:00Z',
  },
  {
    id: '2',
    name: 'TechStart Inc.',
    email: 'hello@techstart.io',
    phone: '+1 (555) 987-6543',
    company: 'TechStart Inc.',
    status: 'prospect',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-19T11:45:00Z',
    totalValue: 12000,
    lastContact: '2024-01-17T16:20:00Z',
  },
  {
    id: '3',
    name: 'Global Solutions Ltd.',
    email: 'info@globalsolutions.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Solutions Ltd.',
    status: 'active',
    createdAt: '2024-01-05T08:30:00Z',
    updatedAt: '2024-01-21T13:10:00Z',
    totalValue: 78500,
    lastContact: '2024-01-19T10:30:00Z',
  },
];

// Service functions
export const customerService = {
  // Get all customers with filtering
  getCustomers: async (filters: CustomerFilters = {}): Promise<CustomerResponse> => {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<CustomerResponse>('/customers', { params: filters });
      // return response.data;
      
      // Mock implementation for demo
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      let filteredCustomers = [...mockCustomers];
      
      if (filters.status) {
        filteredCustomers = filteredCustomers.filter(c => c.status === filters.status);
      }
      
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(c =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search) ||
          c.company?.toLowerCase().includes(search)
        );
      }
      
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return {
        customers: filteredCustomers.slice(startIndex, endIndex),
        total: filteredCustomers.length,
        page,
        totalPages: Math.ceil(filteredCustomers.length / limit),
      };
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Get customer by ID
  getCustomer: async (id: string): Promise<Customer> => {
    try {
      // const response = await apiClient.get<Customer>(`/customers/${id}`);
      // return response.data;
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      const customer = mockCustomers.find(c => c.id === id);
      if (!customer) {
        throw new Error('Customer not found');
      }
      return customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  // Create new customer
  createCustomer: async (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
    try {
      // const response = await apiClient.post<Customer>('/customers', customerData);
      // return response.data;
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockCustomers.push(newCustomer);
      return newCustomer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (id: string, updates: Partial<Customer>): Promise<Customer> => {
    try {
      // const response = await apiClient.put<Customer>(`/customers/${id}`, updates);
      // return response.data;
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      const index = mockCustomers.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('Customer not found');
      }
      
      mockCustomers[index] = {
        ...mockCustomers[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return mockCustomers[index];
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  // Delete customer
  deleteCustomer: async (id: string): Promise<void> => {
    try {
      // await apiClient.delete(`/customers/${id}`);
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 600));
      const index = mockCustomers.findIndex(c => c.id === id);
      if (index === -1) {
        throw new Error('Customer not found');
      }
      mockCustomers.splice(index, 1);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  },
};
