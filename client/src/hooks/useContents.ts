import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { Content } from '../types';

interface FetchContentsResponse {
  status: string;
  contents: Content[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const useContents = (page: number = 1, limit: number = 20) => {
  const queryClient = useQueryClient();

  const contentsQuery = useQuery<FetchContentsResponse>({
    queryKey: ['contents', page, limit],
    queryFn: async () => {
      const response = await api.get<FetchContentsResponse>('/contents', {
        params: { page, limit },
      });
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/contents/${id}`);
    },
    onSuccess: () => {
      // Invalidate the query key to auto-refetch the list
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch(`/contents/${id}/favorite`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the query key to auto-refetch the list
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });

  return {
    contentsQuery,
    deleteContent: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    toggleFavorite: toggleFavoriteMutation.mutateAsync,
    isTogglingFavorite: toggleFavoriteMutation.isPending,
  };
};
