import { FC } from "react";
import css from "./MainBlock.module.css";
import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };

export const MainBlock: FC = () => {
    return (
        <section className={css.main_block}>
            <h1>{Content.Home.h1}</h1>
            <p>{Content.Home.description}</p>
            <UI.Button variant="link" colorScheme="tertiary" href="#request-form" style={{ padding: "14px 24px" }}>
                {Content.Home.button}
            </UI.Button>
            <div className={css.dark_curtain} />
        </section>
    );
};
