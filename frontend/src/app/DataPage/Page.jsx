import React, { useEffect, useState } from "react";
import axios from "axios";

const DataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data") // backend API
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Users Data</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{item.id}</td>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataPage;