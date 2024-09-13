import React, { useState } from 'react';
import Table from '@/app/_components/table';

export default function ActionLogSections() {
  // Example initial state
  const [dataChecked, setDataChecked] = useState([]);
  const [entries, setEntries] = useState([
    // {
    //   logName: 'Sample Action',
    //   timestamp: '2024-09-12 12:34:56',
    //   currentTime: '12:34 PM',
    //   status: 'Completed',
    //   details: 'Details of the action',
    // },
    // // Add more entries as needed
  ]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle view and delete actions
  const handleView = (record) => {
    alert(`Viewing: ${JSON.stringify(record)}`);
  };

  const handleDelete = (record) => {
    if (window.confirm(`Are you sure you want to delete this entry?`)) {
      setEntries(entries.filter(entry => entry !== record));
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Action Log</h2>
      <Table
        dataChecked={dataChecked}
        setDataChecked={setDataChecked}
        data={entries}
        columns={[
          {
            title: 'Action',
            key: 'logName',
          },
          {
            title: 'Timestamp',
            key: 'timestamp',
          },
          {
            title: 'Current Time',
            key: 'currentTime',
          },
          {
            title: 'Status',
            key: 'status',
            render: (text) => (
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  text === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : text === 'Paused'
                    ? 'bg-yellow-100 text-yellow-800'
                    : text === 'Resume'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {text}
              </span>
            ),
          },
          {
            title: 'Details',
            key: 'details',
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <div className="flex space-x-4">
                <button
                  onClick={() => handleView(record)}
                  className="text-blue-500 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(record)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        isCheckbox={true}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
