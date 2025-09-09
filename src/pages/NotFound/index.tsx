
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Sahifa topilmadi</p>
      <Link
        to="/dashboard"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Dashboardga qaytish
      </Link>
    </div>
  );
};

export default NotFound;
