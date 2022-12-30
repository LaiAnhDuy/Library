import { path } from '../constant/path';
import AdminBook from '../pages/admin/AdminBook';
import DashBoard from '../pages/admin/DashBoard';
import BookDetail from '../pages/book/BookDetail';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import ListBook from '../pages/user/ListBook';
import ListBorrowedBook from '../pages/user/ListBorrowedBook';
import ListBorrowingBook from '../pages/user/ListBorrowingBook';

export const PageRoutes = [
  {
    path: path.HOME,
    element: Home,
  },
  {
    path: path.LOGIN,
    element: Login,
  },
  {
    path: path.REGISTER,
    element: Register,
  },
  {
    path: path.BOOK_DETAIL,
    element: BookDetail
  },
  {
    path: path.USER_LIST_FAVORITE,
    element: ListBook
  },
  {
    path: path.USER_LIST_BORROWING,
    element: ListBorrowingBook
  },
  {
    path: path.USER_LIST_BORROWED,
    element: ListBorrowedBook
  },
  {
    path: path.ADMIN_DASHBOARD,
    element: DashBoard
  },
  {
    path: path.ADMIN_BOOK,
    element: AdminBook
  }
];
