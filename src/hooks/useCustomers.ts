import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService, Customer, CustomerFilters, CustomerResponse } from '../services/customerService';

// Query keys for cache management
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (filters: CustomerFilters) => [...customerKeys.lists(), filters] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

// Hook for fetching customers list
export function useCustomers(filters: CustomerFilters = {}) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: () => customerService.getCustomers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

// Hook for fetching a single customer
export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => customerService.getCustomer(id),
    enabled: !!id, // Only run if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Hook for creating a customer
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.createCustomer,
    onSuccess: (newCustomer) => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      
      // Optionally, add the new customer to cache
      queryClient.setQueryData(customerKeys.detail(newCustomer.id), newCustomer);
    },
    onError: (error) => {
      console.error('Failed to create customer:', error);
    },
  });
}

// Hook for updating a customer
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Customer> }) =>
      customerService.updateCustomer(id, updates),
    onSuccess: (updatedCustomer) => {
      // Update the specific customer in cache
      queryClient.setQueryData(customerKeys.detail(updatedCustomer.id), updatedCustomer);
      
      // Invalidate customers lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update customer:', error);
    },
  });
}

// Hook for deleting a customer
export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.deleteCustomer,
    onSuccess: (_, deletedId) => {
      // Remove customer from cache
      queryClient.removeQueries({ queryKey: customerKeys.detail(deletedId) });
      
      // Invalidate customers lists
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete customer:', error);
    },
  });
}

// Hook for optimistic updates
export function useOptimisticCustomerUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Customer> }) =>
      customerService.updateCustomer(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: customerKeys.detail(id) });

      // Snapshot the previous value
      const previousCustomer = queryClient.getQueryData<Customer>(customerKeys.detail(id));

      // Optimistically update to the new value
      if (previousCustomer) {
        queryClient.setQueryData<Customer>(customerKeys.detail(id), {
          ...previousCustomer,
          ...updates,
          updatedAt: new Date().toISOString(),
        });
      }

      // Return a context object with the snapshotted value
      return { previousCustomer };
    },
    onError: (err, { id }, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCustomer) {
        queryClient.setQueryData(customerKeys.detail(id), context.previousCustomer);
      }
    },
    onSettled: (_, __, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
}
