import { PageRoutes } from './constant';
import {
  BrowserRouter as Switch,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LocalStorage from '../services/LocalStorage';

export const CustomerRoutes = () => {
  const auth = LocalStorage.getLocalAccessToken();
  return (
    <Switch>
      <Routes>
        {PageRoutes.map((p, index) => {
          const Element = p.element;
          return (
            <Route
              key={index}
              path={p.path}
              element={
                !auth && p.path !== '/login' && p.path !== '/register' ? (
                  <Navigate to={'/login'} />
                ) : (
                  <Element />
                )
              }
            />
          );
        })}
      </Routes>
    </Switch>
  );
};
