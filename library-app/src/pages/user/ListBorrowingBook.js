import { Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import ListBorrowingBookTable from "../../components/user/ListBorrowingBookTable.js";

export default function ListBorrowingBook() {
    return (
        <MainLayout>
            <Container>
                <Card>
                    <CardContent>
                        <ListBorrowingBookTable />
                    </CardContent>
                </Card>
            </Container>
        </MainLayout>
    )
}