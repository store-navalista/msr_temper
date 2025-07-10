import Content from "@/content/en.json" assert { type: "json" };
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import css from "../Navigation.module.css";
import { DropdownList } from "./Dropdown";
import { AnimatedIcon } from "./Icons";

export const ListLink: FC<{ page_id: keyof typeof Content.MenuItems }> = ({ page_id }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className={css.dropdown_company} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <p>{Content.MenuItems[page_id]}</p>
            <AnimatedIcon page_id={page_id as "COMPANY" | "SERVICES" | "NEWS"} />
            <AnimatePresence>
                {isOpen && (
                    <motion.ul className={css.dropdown} initial={{ opacity: 0, x: "-50%", y: -10 }} animate={{ opacity: 1, x: "-50%", y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                        <DropdownList {...{ page_id }} />
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
};
