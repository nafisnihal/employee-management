import { connectDB } from "@/lib/db";
import Employee from "@/lib/models";
import { NextResponse } from "next/server";

// POST Request - Create a New Employee
export async function POST(req: Request) {
  const { name, phone, email, address, imageUrl } = await req.json();

  try {
    await connectDB();

    const newEmployee = new Employee({
      name,
      phone,
      email,
      address,
      imageUrl:
        imageUrl ||
        "https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });

    await newEmployee.save();

    return NextResponse.json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error); // Log the error for debugging
    return NextResponse.json({
      message: "Error creating employee",
      error: (error as Error).message,
    });
  }
}

// GET Request - Fetch all Employees
export async function GET() {
  try {
    await connectDB();

    const employees = await Employee.find();

    return NextResponse.json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error); // Log the error for debugging
    return NextResponse.json({
      message: "Error fetching employees",
      error: (error as Error).message,
    });
  }
}
