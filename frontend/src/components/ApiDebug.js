import React from 'react';

const ApiDebug = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'not set';
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/50 text-white p-4 rounded-lg text-sm">
      <p>API URL: {apiUrl}</p>
    </div>
  );
};

export default ApiDebug;