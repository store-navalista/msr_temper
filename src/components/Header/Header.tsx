import { motion } from "framer-motion";
import { useAnimateOnView } from "../hooks/useAnimateOnView";
import { useScrollStep } from "../hooks/useScrollStep";
import { Logo } from "./components/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";
import css from "./Header.module.css";
import { useMatchQuery } from "../hooks/useMatchQuery";
import { BurgerMenu } from "./components/BurgerMenu/BurgerMenu";

export const Header = () => {
    const isMatchMedia = useMatchQuery(1000);
    const cnt = 60;
    const isScrolled = useScrollStep() > cnt;
    const { ref, animation } = useAnimateOnView("none", 0, 0, 0.2);

    return (
        <>
            {!isMatchMedia && (
                <header className={css.header} style={{ opacity: isScrolled ? 0 : 1 }}>
                    <Logo isScrolled={isMatchMedia} />
                    <Navigation />
                </header>
            )}
            {(isScrolled || isMatchMedia) && (
                <motion.div ref={ref} className={css.header_wrapper} {...animation}>
                    <header className={css.scrolled_header}>
                        <Logo isScrolled={isScrolled || isMatchMedia} />
                        {isMatchMedia ? <BurgerMenu /> : <Navigation isScrolled={isScrolled} />}
                    </header>
                </motion.div>
            )}
        </>
    );
};
