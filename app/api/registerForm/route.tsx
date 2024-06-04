import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/app/registrationSchema";

export async function POST(req: NextRequest) {
  const formData = await req.formData(); // Get the form data
  const data = Object.fromEntries(formData); // Convert form data into a simple data object

  let parsed = schema.safeParse(data);
  if (parsed.success) {
    // Add parsed.data to the database
    return NextResponse.json({ message: "User registered", data: parsed.data });
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
}
