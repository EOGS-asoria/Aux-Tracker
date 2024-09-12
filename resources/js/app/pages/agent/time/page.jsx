import React, { useEffect } from 'react';
import AdminLayout from '../layout';
import DateTimeDisplay from './sections/DateTimeDisplay';
import Button from '@/app/_components/button';
import Select from '@/app/_components/select';
import TimePageSection from './sections/time-section';
import { useSelector } from 'react-redux';
import store from '@/store/store';
import { get_time_in_user_by_id_thunk } from '@/app/_redux/app-thunk';


export default function AdminTimePage() {

  const { user } = useSelector((state) => state.app);

  useEffect(() => {
    if (user?.id) {
      store.dispatch(get_time_in_user_by_id_thunk(user.id));
    }
  }, [user?.id]);
  return (
    <AdminLayout>

      <DateTimeDisplay />
      <TimePageSection />

    </AdminLayout>
  );
}