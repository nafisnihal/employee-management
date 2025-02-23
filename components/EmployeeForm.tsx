"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
  imageUrl: z.string().url("Invalid URL").optional(),
});

type EmployeeFormInputs = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeeForm = ({ isOpen, onOpenChange }: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormInputs) => {
    try {
      const response = await axios.post("/api/employees", data);
      reset();
      toast("Employee created successfully!");
      console.log(response.data);
      onOpenChange(false);
    } catch (error) {
      toast("Error creating employee");
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
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="block text-sm font-medium">
              Name
            </Label>
            <Input
              {...register("name")}
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium ">
              Phone
            </Label>
            <Input
              {...register("phone")}
              type="text"
              id="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium ">
              Email
            </Label>
            <Input
              {...register("email")}
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Address Field */}
          <div>
            <Label htmlFor="address" className="block text-sm font-medium ">
              Address
            </Label>
            <Input
              {...register("address")}
              type="text"
              id="address"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Image URL Field (optional) */}
          <div>
            <Label htmlFor="imageUrl" className="block text-sm font-medium ">
              Image URL
            </Label>
            <Input
              {...register("imageUrl")}
              type="url"
              id="imageUrl"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.imageUrl && (
              <span className="text-red-500 text-sm">
                {errors.imageUrl.message}
              </span>
            )}
          </div>

          <Button type="submit" className="mt-4 w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
