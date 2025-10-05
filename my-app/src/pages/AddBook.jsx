import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AddBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  // Fetch book data if editing
  const { data: book, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      return res.data;
    },
    enabled: isEdit,
  });

  // Reset form with book data when editing
  useEffect(() => {
    if (book && isEdit) {
      reset({
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        year: book.year,
      });
    }
  }, [book, isEdit, reset]);

  // Mutation for add/edit
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEdit) {
        return axios.put(`http://localhost:5000/api/books/${id}`, data, config);
      } else {
        return axios.post('http://localhost:5000/api/books', data, config);
      }
    },
    onSuccess: () => {
      toast.success(isEdit ? 'Book updated successfully!' : 'Book added successfully!');
      queryClient.invalidateQueries(['books']);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.msg || 'Something went wrong!');
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    // Convert year to number
    const bookData = {
      ...data,
      year: parseInt(data.year),
    };
    mutation.mutate(bookData);
  };

  if (isEdit && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading book data...</div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-2xl mx-auto"
    >
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          {isEdit ? 'Edit Book' : 'Add New Book'}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Title *
          </label>
          <input 
            {...register('title', { required: 'Title is required' })} 
            placeholder="Enter book title" 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Author *
          </label>
          <input 
            {...register('author', { required: 'Author is required' })} 
            placeholder="Enter author name" 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Description *
          </label>
          <textarea 
            {...register('description', { required: 'Description is required' })} 
            placeholder="Enter book description" 
            rows="4"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Genre and Year Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Genre */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Genre *
            </label>
            <input 
              {...register('genre', { required: 'Genre is required' })} 
              placeholder="e.g., Fiction, Fantasy" 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Published Year *
            </label>
            <input 
              {...register('year', { 
                required: 'Year is required',
                min: { value: 1000, message: 'Year must be after 1000' },
                max: { value: new Date().getFullYear() + 1, message: 'Year cannot be in the future' }
              })} 
              type="number" 
              placeholder="e.g., 2024" 
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button 
            type="submit" 
            disabled={isSubmitting || mutation.isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting || mutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isEdit ? 'Updating...' : 'Adding...'}
              </span>
            ) : (
              isEdit ? 'Update Book' : 'Add Book'
            )}
          </motion.button>

          <motion.button 
            type="button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddBook;