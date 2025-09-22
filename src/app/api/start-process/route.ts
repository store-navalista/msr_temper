import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        await axios.post(`${process.env.ELMA_SV_URL}`, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ELMA_SV_TOKEN?.trim()}`,
            },
            validateStatus: () => true, // Чтобы axios не бросал ошибку на 400
        });

        // await fetch(`http://localhost:3001/api/users`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/pdf",
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
