"use client";

import { FC, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import { NewsBlock } from "../Pages/components/NewsBlock/NewsBlock";
import css from "./PageLayout.module.css";

import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import store from "@/store/store";

type PageLayoutProps = {
    children: ReactNode;
};

NProgress.configure({
    showSpinner: true,
    trickleSpeed: 100,
    minimum: 0.1,
});

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.done();
    }, [pathname]);

    useEffect(() => {
        const loader = document.getElementById("global-loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }, []);

    return (
        <Provider store={store}>
            <div className={css.page_layout}>
                <Header />
                {children}
                <NewsBlock />
                <Footer />
            </div>
        </Provider>
    );
};
