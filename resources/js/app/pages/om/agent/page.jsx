import React from "react";
import AdminLayout from "../layout";
import ViewTeamSections from "./sections/view-team-sections";

export default function ViewTeamPage() {
    return (
        <div>
            <AdminLayout>
                <ViewTeamSections />
            </AdminLayout>
        </div>
    );
}
