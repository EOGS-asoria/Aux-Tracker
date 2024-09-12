    import React from 'react';
    import AdminLayout from '../layout';
    import DateTimeDisplay from './sections/date-time-display';
    import Button from '@/app/_components/button';
    import Select from '@/app/_components/select';
    import TimePageSection from './sections/time-section';


    export default function AdminTimePage() {
      return (
        <AdminLayout>

          <DateTimeDisplay />
          <TimePageSection />

        </AdminLayout>
      );
    }