import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../apiClient';
import { ContactReq, ContactRes } from '../models/contact';

const createContact = async (data: ContactReq): Promise<ContactRes> => {
  const response = await apiClient.post('contacts', data);
  return response.data;
};

const useCreateContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ContactRes, Error, ContactReq>({
    mutationFn: (data) => createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      console.error('Error creating network:', error);
    },
  });
};

export default useCreateContactMutation;
