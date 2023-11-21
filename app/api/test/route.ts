import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ success: "OK" }, { status: 200 });
}
