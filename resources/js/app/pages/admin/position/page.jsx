import React, { useEffect } from "react";
import AdminLayout from "../layout";
import PositionTableSection from "./sections/position-table-sections";
import store from "@/store/store";
import { get_position_thunk } from "./redux/position-thunk";

export default function AdminPostionPage() {
    useEffect(() => {
        store.dispatch(get_position_thunk()); 
    }, []);
    return (
        <AdminLayout>
            <PositionTableSection />
        </AdminLayout>
    );
}
