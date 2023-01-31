import AdminBookDetail from './components/admin/AdminBookDetail';
import AdminOrderDetail from './components/admin/AdminOrderDetail';
import AlertModal from './components/modal/AlertModal';
import LoadingModal from './components/modal/LoadingModal';
import { CustomerRoutes } from './routes/routes';

function App() {
  return (
    <>
      <CustomerRoutes />
      <AlertModal />
      <LoadingModal />
      <AdminOrderDetail />
      <AdminBookDetail />
    </>
  )

}

export default App;
