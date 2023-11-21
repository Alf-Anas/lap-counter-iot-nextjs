import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    const record = await sql`SELECT * FROM history ORDER BY created_at DESC;`;
    const eData = record.rows || [];
    return NextResponse.json(eData, { status: 200 });
}

export async function POST(request: Request) {
    const data = await request.json();

    try {
        await sql`INSERT INTO history (car_a, car_b, car_c, record) VALUES (${data.car_a}, ${data.car_b}, ${data.car_c}, ${data.record});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ data }, { status: 201 });
}
