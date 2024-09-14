import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
      const { username, email, password } = await req.json();
      
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "all fields are required" },
        { status: 400 }
      );
      }
      const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] })
      if (existingUser) {
          return NextResponse.json({message:"User already exists!"})
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      {
        message: "User registered successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
