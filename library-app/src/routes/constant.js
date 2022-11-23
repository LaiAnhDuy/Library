import { path } from '../constant/path';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';

export const PageRoutes = [
  {
    path: path.HOME,
    element: Home,
  },
  {
    path: path.LOGIN,
    element: Login,
  },
];
