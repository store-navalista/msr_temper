import { NextRequest, NextResponse } from "next/server";
import { pushFile } from "@/lib/waitStore";

export async function POST(req: NextRequest) {
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    pushFile({
        buffer,
        mime: req.headers.get("content-type") || "application/pdf",
        filename: req.headers.get("x-filename") || `file-${Date.now()}.pdf`,
    });

    return NextResponse.json({ ok: true });
}
