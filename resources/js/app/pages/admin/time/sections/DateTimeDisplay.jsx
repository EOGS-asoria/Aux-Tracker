import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const updateDateTime = () => {
      setDateTime(new Date()); 
    };

    // Update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="text-lg font-semibold mr-4">{formatDate(dateTime)}</p>
      <p className="text-xl font-bold">{dateTime.toLocaleString()}</p>
    </div>
  );
};

export default DateTimeDisplay;
