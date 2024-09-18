import React from "react";
import AdminLayout from "../layout"; 
import PositionSectionPage from "./sections/position-sections";

export default function AdminPostionPage() {
    return (
        <AdminLayout>
            <PositionSectionPage />
        </AdminLayout>
    );
}
