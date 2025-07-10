import { FC } from "react";
import { TabsType } from "../ClientCabinet";
import css from "./Navigation.module.css";
import Content from "@/content/en.json" assert { type: "json" };

type NavigationProps = {
    activeTab: TabsType;
    setActiveTab: React.Dispatch<React.SetStateAction<TabsType>>;
};

export const Navigation: FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
    const buttons = Object.keys(Content.CLIENT.Cabinet.navigation) as TabsType[];

    return (
        <nav className={css.nav}>
            {buttons.map((tab, index) => {
                return (
                    <button onClick={() => setActiveTab(tab)} data-active={activeTab === tab} key={index}>
                        {Content.CLIENT.Cabinet.navigation[tab]}
                    </button>
                );
            })}
        </nav>
    );
};
