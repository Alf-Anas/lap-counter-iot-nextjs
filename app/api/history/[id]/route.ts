import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const record = await sql`SELECT * FROM history WHERE id=${params.id};`;
    if (record.rows.length > 0) {
        return NextResponse.json(record.rows[0], { status: 200 });
    } else {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
}
