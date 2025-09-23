"use client";

import Content from "@/content/en.json" assert { type: "json" };
import { FC, useState } from "react";
import { CompanyDataType, TabsType } from "../../ClientCabinet";
import css from "./Tabs.module.css";
import { Tables } from "./components";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const Table: FC<{ type: TabsType; companyData: CompanyDataType }> = ({ type, companyData }) => {
    switch (type) {
        case "basic":
            return <Tables.Basic {...{ companyData }} />;
        case "fleet":
            return <Tables.Vessels {...{ companyData }} />;
        case "online_app":
            return <Tables.Online />;
        default:
            return null;
    }
};

export const Tabs: FC<{ activeTab: TabsType; companyData: CompanyDataType }> = ({ activeTab, companyData }) => {
    const [isLoader] = useState(false);

    return (
        <div className={css.tabs}>
            <p className={css.head}>{Content.CLIENT.Cabinet.navigation[activeTab]}</p>
            {isLoader ? (
                <div className={css.tables_loader}>
                    <Image src="/images/svg/loader.svg" alt="loader" width={50} height={50} />
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                        <Table type={activeTab} companyData={companyData} />
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};
