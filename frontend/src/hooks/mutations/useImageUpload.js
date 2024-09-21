import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadCafeLogo } from '../../api/cafe'

const useImageUpload = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadCafeLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] })
    },
    onError: (error) => {
      console.error('Error uploading cafe logo:', error.message)
    }
  })
}

export {
  useImageUpload
}