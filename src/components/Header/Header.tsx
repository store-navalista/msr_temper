import { Logo } from "./components/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";
import css from "./Header.module.css";
import { useScrollStep } from "../hooks/useScrollStep";
import { useAnimateOnView } from "../hooks/useAnimateOnView";
import { motion } from "framer-motion";

export const Header = () => {
    const scrollStep = useScrollStep();
    const cnt = 60;
    const { ref, animation } = useAnimateOnView("none", 0, 0, 0.2);

    return (
        <>
            <header className={css.header} style={{ opacity: scrollStep > cnt ? 0 : 1 }}>
                <Logo />
                <Navigation />
            </header>
            {scrollStep > cnt && (
                <motion.div ref={ref} className={css.header_wrapper} {...animation}>
                    <header className={css.scrolled_header}>
                        <Logo isScrolled={scrollStep > cnt} />
                        <Navigation isScrolled={scrollStep > cnt} />
                    </header>
                </motion.div>
            )}
        </>
    );
};
