"use client";

import { SVG } from "@/components/SVG";
import css from "../Tabs.module.css";

export const Basic = () => {
    return (
        <div className={css.basic}>
            <div className={css.info}>
                <div className={css.row}>
                    <SVG.Address className={css.icon} />
                    <p>Address:</p>
                    <p>Isla Lennox, Cabo de Hornos, Magallanes y la Antártica Chilena, Chile</p>
                </div>
                <div className={css.row}>
                    <SVG.AltMail className={css.icon} />
                    <p>Email:</p>
                    <p>user@gmail.com</p>
                </div>
                <div className={css.row}>
                    <SVG.IMO className={css.icon} />
                    <p>IMO:</p>
                    <p>9876543</p>
                </div>
            </div>
        </div>
    );
};
