// app/api/employees/[id]/route.ts

import { connectDB } from "@/lib/db";
import Employee from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const id = req.url.split("/").pop() || "";

  if (!id) {
    return NextResponse.json({ message: "Employee ID is required" });
  }

  try {
    await connectDB();

    const employee = await Employee.findById(id);

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" });
    }

    return NextResponse.json({ employee });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching employee",
      error: (error as Error).message,
    });
  }
}

export async function PUT(req: Request) {
  const id = req.url.split("/").pop() || "";
  const { name, phone, email, address, imageUrl } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "Employee ID is required" });
  }

  try {
    await connectDB();

    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, phone, email, address, imageUrl },
      { new: true } // Return the updated document
    );

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" });
    }

    return NextResponse.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating employee",
      error: (error as Error).message,
    });
  }
}

export async function DELETE(req: Request) {
  const id = req.url.split("/").pop() || "";

  if (!id) {
    return NextResponse.json({ message: "Employee ID is required" });
  }

  try {
    await connectDB();

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" });
    }

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting employee",
      error: (error as Error).message,
    });
  }
}
