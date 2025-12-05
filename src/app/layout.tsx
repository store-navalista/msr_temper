import { PageLayout } from "@/components/PageLayout/PageLayout";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import "@/styles/globals.css";

type Props = {
    children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
    const cookieStore = await cookies();
    const theme = cookieStore.get("theme")?.value || "light";

    return (
        <html lang="en" data-theme={theme}>
            <body>
                <PageLayout>{children}</PageLayout>
            </body>
        </html>
    );
}
