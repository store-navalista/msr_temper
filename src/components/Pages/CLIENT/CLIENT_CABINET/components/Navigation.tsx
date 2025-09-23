"use client";

import Content from "@/content/en.json" assert { type: "json" };
import { useRouter } from "next/navigation";
import { FC } from "react";
import { TabsType } from "../ClientCabinet";
import css from "./Navigation.module.css";
import { useLogoutMutation } from "@/store/reducers/apiReducer";

type NavigationProps = {
    activeTab: TabsType;
    setActiveTab: React.Dispatch<React.SetStateAction<TabsType>>;

};

export const Navigation: FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
    const [logout, { isLoading }] = useLogoutMutation();
    const buttons = Object.keys(Content.CLIENT.Cabinet.navigation) as TabsType[];
    const router = useRouter();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            router.push(`/for-clients/cabinet`);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className={css.nav}>
            {buttons.map((tab, index) => {
                return (
                    <button onClick={() => setActiveTab(tab)} data-active={activeTab === tab} key={index}>
                        {Content.CLIENT.Cabinet.navigation[tab]}
                    </button>
                );
            })}
            <button onClick={logoutHandler} className={css.logout} disabled={isLoading}>
                Logout
            </button>
        </nav>
    );
};
