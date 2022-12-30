import { Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import ListBorrowedBookTable from "../../components/user/ListBorrowedBookTable.js";

export default function ListBorrowedBook() {
    return (
        <MainLayout>
            <Container>
                <Card>
                    <CardContent>
                        <ListBorrowedBookTable />
                    </CardContent>
                </Card>
            </Container>
        </MainLayout>
    )
}