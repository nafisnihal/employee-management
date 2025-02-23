"use client";

import Card from "@/components/card/Card";
import CardSkeleton from "@/components/card/CardSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  imageUrl: string;
}

export default function Page() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data.employees);
      } catch (error) {
        setError("Error fetching employee data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {loading ? (
        new Array(12).fill(0).map((_, i) => <CardSkeleton key={i} />)
      ) : employees?.length === 0 ? (
        <p className="mt-4">No employees found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-4">
          {employees.map((employee, i) => (
            <Card employee={employee} key={i} />
          ))}
        </div>
      )}
    </>
  );
}
