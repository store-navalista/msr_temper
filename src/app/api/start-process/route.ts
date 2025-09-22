import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        await fetch(`${process.env.ELMA_SV_URL}`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ELMA_SV_TOKEN}`,
            },
            body,
        });
        // await fetch(`http://localhost:3001/api/users`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${process.env.ELMA_SV_TOKEN}`,
        //     },
        //     body,
        // });

        return NextResponse.json({ started: true });
    } catch (error) {
        return NextResponse.json({ started: false, error: (error as Error).message }, { status: 500 });
    }
}
//
