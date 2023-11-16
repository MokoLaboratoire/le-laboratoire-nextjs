import apiSlice from '../slices/apiSlice';
import { default as ApiConstants } from '@/constants/apiConstants.json';
import { TaskInterface } from '@/interfaces/TaskInterface';

const taskApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<TaskInterface[], void>({
      query: () => ApiConstants.TASK,
      providesTags: ['Task']
    })
  })
});

export const {
    useGetTasksQuery
} = taskApi;
