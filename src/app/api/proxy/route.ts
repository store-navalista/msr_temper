import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const target = req.nextUrl.searchParams.get("url");
    if (!target) {
        return new NextResponse("Missing url", { status: 400 });
    }

    const allowedHost = "elma.tm-z.com";
    let parsed: URL;
    try {
        parsed = new URL(target);
        if (parsed.hostname !== allowedHost) {
            return new NextResponse("Host not allowed", { status: 403 });
        }
    } catch {
        return new NextResponse("Invalid url", { status: 400 });
    }

    try {
        const fetched = await fetch(target);
        if (!fetched.ok) {
            return new NextResponse("Upstream fetch failed", { status: 502 });
        }

        let html = await fetched.text();

        const baseTag = `<base href="${parsed.origin}">`;
        const customCss = `
      <style>
        .qbpm-form button { background: #123456 !important; color: #fff !important; }
      </style>
    `;

        html = html.replace(/<head([^>]*)>/i, (match) => `${match}\n${baseTag}\n${customCss}`);

        return new NextResponse(html, {
            status: 200,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "X-Frame-Options": "ALLOWALL",
            },
        });
    } catch {
        return new NextResponse("Proxy error", { status: 500 });
    }
}
