import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';
import MainLayout from '../../components/layout/MainLayout';
import ListBookTable from '../../components/user/ListBookTable';

export default function ListBook() {
  return (
    <MainLayout>
      <Container>
        <Card>
          <CardContent>
            <ListBookTable />
          </CardContent>
        </Card>
      </Container>
    </MainLayout>
  );
}
