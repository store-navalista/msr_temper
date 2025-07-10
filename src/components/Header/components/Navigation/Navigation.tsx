import { UI } from "@/components/UI";
import { MENU } from "@/constants/parts";
import Content from "@/content/en.json" assert { type: "json" };
import { ListLink } from "./components/ListLink";
import css from "./Navigation.module.css";
import { FC } from "react";
import Image from "next/image";

export const Navigation: FC<{ isScrolled?: boolean }> = ({ isScrolled }) => {
    const contactHandler = () => {
        console.log("Contact Us button clicked");
    };

    const menu_items = Object.keys(MENU) as Array<keyof typeof MENU>;

    return (
        <nav className={css.wrapper}>
            <ul className={css.links}>
                {menu_items.map((page_id, index) => {
                    return <ListLink key={index} {...{ page_id, index }} />;
                })}
            </ul>
            {!isScrolled ? (
                <UI.Button onClick={contactHandler} colorScheme="tertiary">
                    {Content.GlobalTitles.contact_us}
                </UI.Button>
            ) : (
                <button onClick={contactHandler} className={css.scrolled_btn}>
                    <Image src="/images/svg/contact-us.svg" alt="contact us" width={24} height={24} />
                </button>
            )}
        </nav>
    );
};
