"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const employeeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  imageUrl: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
});

type EmployeeFormInputs = z.infer<typeof employeeSchema>;

interface Employee {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  imageUrl: string;
}

interface EmployeeFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null; // For edit mode
  refreshData: () => void; // Function to refresh table data
}

const EmployeeForm = ({
  isOpen,
  onOpenChange,
  employee,
  refreshData,
}: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeSchema),
  });

  useEffect(() => {
    if (employee) {
      setValue("name", employee.name);
      setValue("phone", employee.phone);
      setValue("email", employee.email);
      setValue("address", employee.address);
      setValue("imageUrl", employee.imageUrl || "");
    } else {
      reset();
    }
  }, [employee, setValue, reset]);

  const onSubmit = async (data: EmployeeFormInputs) => {
    try {
      if (employee?._id) {
        await axios.put(`/api/employees/${employee._id}`, data);
        toast("Employee updated successfully!");
      } else {
        await axios.post("/api/employees", data);
        toast("Employee created successfully!");
      }

      reset();
      onOpenChange(false);
      refreshData();
    } catch (error) {
      toast("Error saving employee data");
      console.error(error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input {...register("name")} id="name" />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input {...register("phone")} id="phone" />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} id="email" />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input {...register("address")} id="address" />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input {...register("imageUrl")} id="imageUrl" />
            {errors.imageUrl && (
              <span className="text-red-500 text-sm">
                {errors.imageUrl.message}
              </span>
            )}
          </div>

          <Button type="submit" className="mt-4 w-full">
            {employee ? "Update Employee" : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
