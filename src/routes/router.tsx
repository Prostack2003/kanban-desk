import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Task } from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/tasks/task/:taskId',
    element: <Task />
  },
  ]);
