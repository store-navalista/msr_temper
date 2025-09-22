import { NextRequest } from "next/server";

export const fileStorage = new Map<string, string>();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (body.status_survey) {
            fileStorage.set("status_survey", body.vessel_name);

            if (!body?.status_survey) {
                return new Response(JSON.stringify({ error: "File not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }

            const fileName = `status_report.pdf`;
            const mimeType = "application/pdf";
            const buffer = Buffer.from(body.status_survey, "base64");

            const headers = new Headers({
                "Content-Type": mimeType,
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Length": buffer.length.toString(),
            });

            return new Response(buffer, { status: 200, headers });
        }

        return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing file:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
