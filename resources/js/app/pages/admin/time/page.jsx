import React from 'react';
import AdminLayout from '../layout';
import DateTimeDisplay from './sections/DateTimeDisplay';
import Button from '@/app/_components/button';
import Select from '@/app/_components/select';


export default function AdminTimePage() {
  return (
    <AdminLayout>
 
      <DateTimeDisplay />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold mt-4 mb-8 text-gray-700">Time Keeping</h1>
          <div className="flex flex-col space-y-4 w-full max-w-md">
            <div className="relative">
              <Select
                options={[
                  { value: 'Clock In', label: 'Clock In' },
                  { value: 'Break', label: 'Break' },
                  { value: 'Back', label: 'Back' },
                  { value: 'Clock Out', label: 'Clock Out' },
                ]}
                // value=""  
                onChange=""
                label="Select Time"
                name="select"
              />
            </div>

            <Button
              className="flex items-center justify-center"
              loading={false}
              type={'submit'}
            >
               Button
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}