import { Wave } from "./Effects/Wave/Wave";
import css from "./Header.module.css";
import Content from "@/content/en.json" assert { type: "json" };

export const Header = () => {
    return (
        <div className={css.header}>
            <div className={css.block}>
                <Wave waveHeightScale={0.9} height={206} />
                <h1>{Content.CLIENT.Cabinet.h1}</h1>
                <p>{Content.CLIENT.Cabinet.description}</p>
            </div>
        </div>
    );
};
