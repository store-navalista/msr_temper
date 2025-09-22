import { NextRequest, NextResponse } from "next/server";
import { pushFile } from "@/lib/waitStore";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.status_survey) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(body.status_survey, "base64");

        pushFile({
            buffer,
            mime: "application/pdf",
            filename: "status_report.pdf",
        });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 500 });
    }
}
