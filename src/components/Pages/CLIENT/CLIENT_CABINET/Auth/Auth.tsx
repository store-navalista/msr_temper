"use client";

import { useEffect, useState } from "react";
import css from "./Auth.module.css";
import { SVG } from "@/components/SVG";
import { useRouter } from "next/navigation";
import { useAuthMutation } from "@/store/reducers/apiReducer";

export const Auth = () => {
    const [auth, { data, isLoading }] = useAuthMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/verify", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const userData = await response.json();
                    router.push(`/for-clients/cabinet/?id=${userData.userId}`);
                } else {
                    setIsCheckingToken(false);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                setIsCheckingToken(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        await auth({ email, password });
    };

    useEffect(() => {
        console.log(data);
        if (data?.status === 401) {
            setError(data.message);
        } else if (data?.status === 200) {
            setError(null);
            router.push(`/for-clients/cabinet/?id=${data?.data?.userId}`);
        }
    }, [data, router]);

    if (isCheckingToken) {
        return (
            <dialog open={true} className={css.authDialog}>
                <div className={css.loading}>Checking authentication...</div>
            </dialog>
        );
    }

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
                <button type="submit">{isLoading ? <span className={css.loader} /> : "Sign In"}</button>
            </form>
            <p className={css.error}>{error}</p>
        </dialog>
    );
};
