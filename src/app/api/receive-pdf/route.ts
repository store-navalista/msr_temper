import { NextRequest } from "next/server";

const fileStorage = new Map<string, string>();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (body.status_survey) {
            const vesselName = body.vessel_name || "document";
            fileStorage.set(vesselName, body.status_survey);

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else if (body.vessel_name) {
            const fileBase64 = fileStorage.get(body.vessel_name);

            if (!fileBase64) {
                return new Response(JSON.stringify({ error: "File not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }

            const fileName = `${body.vessel_name}_status_report.pdf`;
            const mimeType = "application/pdf";
            const base64Data = fileBase64.replace(/^data:.*?;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");

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
