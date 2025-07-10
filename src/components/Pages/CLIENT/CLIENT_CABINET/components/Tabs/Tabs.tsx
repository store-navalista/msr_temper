"use client";

import { FC } from "react";
import css from "./Tabs.module.css";
// import Content from "@/content/en.json" assert { type: "json" };
import { TabsType } from "../../ClientCabinet";

export const Tabs: FC<{ activeTab: TabsType }> = ({ activeTab }) => {
    console.log(activeTab);

    return (
        <div className={css.tabs}>
            <p className={css.head}>Dashboard</p>
        </div>
    );
};
