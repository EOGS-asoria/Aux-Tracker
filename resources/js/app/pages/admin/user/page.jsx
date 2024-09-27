// page.jsx
import React, { useEffect } from "react";
import AdminLayout from "../layout";
import UsersTableSection from "./sections/users-table-section";
import UsersCreateSection from "./sections/users-create-section";
import store from "@/store/store";
import { get_position_thunk } from "../position/redux/position-thunk"; 
import { get_account_thunk } from "../account/redux/account-thunk";
import { get_site_thunk } from "../site/redux/site-thunk";

export default function AdminUserdPage() {
    useEffect(() => {
        store.dispatch(get_position_thunk()); 
        store.dispatch(get_account_thunk()); 
        store.dispatch(get_site_thunk()); 
    }, []); 
    return (
        <AdminLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-8 text-gray-700">
                    Agents
                </h1>
                <UsersCreateSection />
                <UsersTableSection />
            </div>
        </AdminLayout>
    );
}
