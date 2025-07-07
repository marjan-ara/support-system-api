import { apiClient } from '../apiClient';
import { ContactRes } from '../models/contact';
import { useQuery } from '@tanstack/react-query';

const fetchContacts = async (): Promise<ContactRes[]> => {
  try {
    const response = await apiClient.get<ContactRes[]>('contacts');
    console.log('test log response', response);
    return response.data;
  } catch (error: unknown) {
    throw new Error('Error fetching contacts');
  }
};

export const useGetContactsQuery = () => {
  // return useQuery<ContactRes[], Error>(['contacts'], fetchContacts);

  return useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
