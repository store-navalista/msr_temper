"use client";

import { useState } from "react";
import css from "./Auth.module.css";
import { SVG } from "@/components/SVG";
import { useRouter } from "next/navigation";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/for-clients/cabinet/?id=1234");
        console.log("Submitted:", { email, password });
    };

    return (
        <dialog open={true} className={css.authDialog}>
            <form onSubmit={handleSubmit}>
                <SVG.Login className={css.login_icon} />
                <h2>Sign In</h2>
                <p>Here you can track your vessels, jobs and job status.</p>
                <div className={css.filed}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                    <SVG.Mail className={css.icon} />
                </div>
                <div className={css.filed}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                    <SVG.Password className={css.icon} />
                </div>
                <div style={{ height: "32px" }} />
                <button type="submit">Sign In</button>
            </form>
        </dialog>
    );
};
