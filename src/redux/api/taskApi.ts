import apiSlice from '../slices/apiSlice';
import { default as ApiConstants } from '@/constants/apiConstants.json';
import { TaskInterface } from '@/interfaces/TaskInterface';

const taskApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<TaskInterface[], void>({
      query: () => ApiConstants.TASK,
      providesTags: ['Task']
    }),
    addNewTask: build.mutation<TaskInterface, TaskInterface>({
      query: (task) => ({
        url: ApiConstants.TASK,
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Task']
    })
  })
});

export const {
    useGetTasksQuery,
    useAddNewTaskMutation
} = taskApi;
