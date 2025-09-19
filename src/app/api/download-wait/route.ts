import { NextResponse } from "next/server";
import { waitForFile } from "@/lib/waitStore";

export async function GET() {
    const file = await waitForFile();

    return new NextResponse(new Uint8Array(file.buffer), {
        headers: {
            "Content-Type": file.mime,
            "Content-Disposition": `attachment; filename="${file.filename}"`,
        },
    });
}
