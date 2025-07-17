"use client";

import Content from "@/content/en.json" assert { type: "json" };
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Auth } from "./Auth/Auth";
import css from "./ClientCabinet.module.css";
import { FlyCircles } from "./components/Effects/FlyCircles/FlyCircles";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Tabs } from "./components/Tabs/Tabs";

export type TabsType = keyof typeof Content.CLIENT.Cabinet.navigation;

export const ClientCabinet = () => {
    const searchParams = useSearchParams();
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState<TabsType>("dashboard");

    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        setQueryParams(params);

        const tab = params.tab;
        if (tab && Object.keys(Content.CLIENT.Cabinet.navigation).includes(tab)) {
            setActiveTab(tab as TabsType);
        }
    }, [searchParams]);

    return (
        <div className={css.cabinet}>
            {!Object.keys(queryParams).length ? (
                <Auth />
            ) : (
                <>
                    <Header />
                    <Navigation {...{ activeTab, setActiveTab }} />
                    <FlyCircles />
                    <Tabs {...{ activeTab }} />
                </>
            )}
        </div>
    );
};
