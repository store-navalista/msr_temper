import { motion } from "framer-motion";
import { useAnimateOnView } from "../hooks/useAnimateOnView";
import { useScrollStep } from "../hooks/useScrollStep";
import { Logo } from "./components/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";
import css from "./Header.module.css";
import { useMatchQuery } from "../hooks/useMatchQuery";
import { BurgerMenu } from "./components/BurgerMenu/BurgerMenu";
import { UI } from "../UI";
import Image from "next/image";
import Content from "@/content/en.json" assert { type: "json" };
import { ColorThemeToggle, ThemeType } from "./components/ColorThemeToggle/ColorThemeToggle";
import { useState } from "react";

export const Header = () => {
    const [theme, setTheme] = useState<ThemeType>("light");
    const isMatchMedia = useMatchQuery(1000);
    const cnt = 60;
    const isScrolled = useScrollStep() > cnt;
    const { ref, animation } = useAnimateOnView("none", 0, 0, 0.2);

    const contactHandler = () => {
        console.log("Contact Us button clicked");
    };

    return (
        <>
            {!isMatchMedia && (
                <header className={css.header} style={{ opacity: isScrolled ? 0 : 1 }}>
                    <Logo isScrolled={isMatchMedia} />
                    <Navigation />
                    <div className={css.right_block}>
                        <ColorThemeToggle {...{ theme, setTheme }} />
                        <UI.Button onClick={contactHandler} colorScheme="tertiary">
                            {Content.GlobalTitles.contact_us}
                        </UI.Button>
                    </div>
                </header>
            )}
            {(isScrolled || isMatchMedia) && (
                <motion.div ref={ref} className={css.header_wrapper} {...animation}>
                    <header className={css.scrolled_header}>
                        <Logo isScrolled={isScrolled || isMatchMedia} />
                        {isMatchMedia ? (
                            <div className={css.right_block}>
                                <ColorThemeToggle {...{ theme, setTheme }} />
                                <BurgerMenu />
                            </div>
                        ) : (
                            <>
                                <Navigation />
                                <div className={css.right_block}>
                                    <ColorThemeToggle {...{ theme, setTheme }} />
                                    <button onClick={contactHandler} className={css.scrolled_btn}>
                                        <Image src="/images/svg/contact-us.svg" alt="contact us" width={24} height={24} />
                                    </button>
                                </div>
                            </>
                        )}
                    </header>
                </motion.div>
            )}
        </>
    );
};
