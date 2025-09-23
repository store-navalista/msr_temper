"use client";

import { SVG } from "@/components/SVG";
import css from "../Tabs.module.css";
import { FC } from "react";
import { CompanyDataType } from "../../../ClientCabinet";

export const Basic: FC<{ companyData: CompanyDataType }> = ({ companyData = {} }) => {
    const { companies_address, companies_email, companies_imo } = companyData;
    const isString = (value: unknown) => typeof value === "string" && value;

    return (
        <div className={css.basic}>
            <div className={css.info}>
                <div className={css.row}>
                    <SVG.Address className={css.icon} />
                    <p>Address:</p>
                    <p>{isString(companies_address)}</p>
                </div>
                <div className={css.row}>
                    <SVG.AltMail className={css.icon} />
                    <p>Email:</p>
                    <p>{isString(companies_email)}</p>
                </div>
                <div className={css.row}>
                    <SVG.IMO className={css.icon} />
                    <p>IMO:</p>
                    <p>{isString(companies_imo)}</p>
                </div>
            </div>
        </div>
    );
};
