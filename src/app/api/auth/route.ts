// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { serialize } from "cookie";
import { NextResponse, NextRequest } from "next/server";
// import axios from "axios";

export async function POST(req: NextRequest) {
    if (req.method !== "POST") {
        return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    try {
        // const body = await req.json();
        // const { username, password } = body;
        // const elma_req = {
        //     grant_type: "client_credentials",
        //     client_id: process.env.ELMA_CLIENT_ID,
        //     client_secret: process.env.ELMA_CLIENT_SECRET,
        //     redirect_uri: process.env.ELMA_REDIRECT_URI,
        // };

        // const params = new URLSearchParams(elma_req as Record<string, string>).toString();
        // const token_response = await axios.post(process.env.ELMA_REDIRECT_URI || "", params, {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        // });

        // const auth_response = await axios.post(
        //     "https://elma.tm-z.com/api/extensions/36d462e1-bbe9-40b5-bd56-29232ad03d30/script/auth",
        //     { username, password },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token_response.data.access_token}`,
        //         },
        //     }
        // );

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error("Ошибка аутентификации:", error);
        return NextResponse.json({ message: "Внутренняя ошибка сервера" }, { status: 500 });
    }
}
