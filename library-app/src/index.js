import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdminOrderDetail from './components/admin/AdminOrderDetail';
import AlertModal from './components/modal/AlertModal';
import LoadingModal from './components/modal/LoadingModal';
import AdminBookDetail from './components/admin/AdminBookDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
