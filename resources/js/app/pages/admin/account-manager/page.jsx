import React from "react";
import AdminLayout from "../layout";
import AccountManagerSection from "./sections/account-manager-sections";

export default function OmAccountManagerPage() {
    return (
        <AdminLayout>
            <AccountManagerSection />
        </AdminLayout>
    );
}
