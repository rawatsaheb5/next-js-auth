import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "all fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: "Email doesnot exists!" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Incorrect password!" });
    }

    return NextResponse.json(
      {
        message: "Login successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
