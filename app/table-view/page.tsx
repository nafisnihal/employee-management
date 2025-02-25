"use client";

import EmployeeForm from "@/components/EmployeeForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";

import DeleteDialog from "@/components/DeleteDialog";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Employee {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  imageUrl: string;
}

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [employeesPerPage, setEmployeesPerPage] = useState<number>(5);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data.employees);
      setFilteredEmployees(response.data.employees); // Ensure search works on full dataset
    } catch (error) {
      setError("Error fetching employee data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, employees]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      await axios.delete(`/api/employees/${employeeToDelete._id}`);
      setEmployees((prev) =>
        prev.filter((emp) => emp._id !== employeeToDelete._id)
      );
      setFilteredEmployees((prev) =>
        prev.filter((emp) => emp._id !== employeeToDelete._id)
      );
    } catch (error) {
      console.error("Error deleting employee", error);
      toast("Error deleting employee");
    } finally {
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
      toast("Employee deleted successfully!");
    }
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <h1 className="text-2xl font-semibold">Employee Table</h1>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="cursor-pointer"
        >
          + Add Employee
        </Button>
      </div>

      {/* Search and Rows Per Page Selector */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-[300px]"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select
            onValueChange={(value) => setEmployeesPerPage(Number(value))}
            defaultValue="5"
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto w-full mt-4 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile Picture</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="flex items-center justify-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? new Array(employeesPerPage)
                  .fill(0)
                  .map((_, i) => <TableSkeleton key={i} />)
              : currentEmployees?.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell>
                      <Avatar className="w-10 h-10 ml-5">
                        <AvatarImage
                          src={employee.imageUrl}
                          alt={employee.name}
                        />
                        <AvatarFallback>
                          {employee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.address}</TableCell>
                    <TableCell className="flex items-center justify-center gap-3">
                      <Button
                        onClick={() => handleEdit(employee)}
                        className="cursor-pointer"
                      >
                        <SquarePen />
                      </Button>
                      <Button
                        onClick={() => {
                          setEmployeeToDelete(employee);
                          setDeleteDialogOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center justify-end mt-3 gap-2">
        {Array.from(
          { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
          (_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 ${
                currentPage === index + 1
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-transparent text-black dark:text-white"
              } hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border rounded-lg cursor-pointer`}
            >
              {index + 1}
            </Button>
          )
        )}
      </div>

      <EmployeeForm
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        employee={selectedEmployee}
        refreshData={fetchEmployees}
      />
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        handleDelete={handleDelete}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
}
