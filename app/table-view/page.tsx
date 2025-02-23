"use client";

import EmployeeForm from "@/components/EmployeeForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between my-4">
        <h1 className="text-2xl font-semibold">Employee Table</h1>
        <Button onClick={() => setIsDialogOpen(true)}>+ Add Employee</Button>
      </div>
      <EmployeeForm isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
