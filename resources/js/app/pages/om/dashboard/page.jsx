import React from "react";
import AdminLayout from "../layout"; 
import OMDashboardPage from "./sections/dashboard-section";

export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <OMDashboardPage />
        </AdminLayout>
    );
}
