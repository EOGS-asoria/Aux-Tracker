import React from "react";
import AdminLayout from "../layout";
import AgentSection from "./sections/team-section";

export default function AdminUserPage() {
    return (
        <AdminLayout>
            <AgentSection />
        </AdminLayout>
    );
}
