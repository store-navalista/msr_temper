"use client";

// import { ROUTES } from "@/constants/routes";

// import Image from "next/image";
import React, { useState } from "react";
// import { SmartLink } from "../SmartLink/SmartLink";
import css from "./ClientCabinet.module.css";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Tabs } from "./components/Tabs/Tabs";
import Content from "@/content/en.json" assert { type: "json" };
import { FlyCircles } from "./components/Effects/FlyCircles/FlyCircles";

export type TabsType = keyof typeof Content.CLIENT.Cabinet.navigation;

export const ClientCabinet = () => {
    const [activeTab, setActiveTab] = useState<TabsType>("dashboard");

    return (
        <div className={css.cabinet}>
            <Header />
            <Navigation {...{ activeTab, setActiveTab }} />
            <FlyCircles />
            <Tabs {...{ activeTab }} />
        </div>
    );
};
