import React, { FC } from "react";
import css from "./Button.module.css";
import clsx from "clsx";
import { SmartLink } from "@/components/Pages/SmartLink/SmartLink";

type ButtonProps = {
    children: React.ReactNode;
    colorScheme?: "primary" | "secondary" | "tertiary";
    variant?: "button" | "link" | "submit";
    href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button: FC<ButtonProps> = ({ children, colorScheme = "primary", variant = "button", href = "/", onClick, className, ...args }) => {
    const combinedClassName = clsx(css.button, className);

    const getColorScheme = () => {
        switch (colorScheme) {
            case "primary":
                return {
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                };
            case "secondary":
                return {
                    backgroundColor: "var(--color-secondary)",
                    color: "#000",
                };
            case "tertiary":
                return {
                    backgroundColor: "var(--color-green)",
                    color: "#fff",
                };
            default:
                return {
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                };
        }
    };

    switch (variant) {
        case "button":
            return (
                <div className={combinedClassName}>
                    <button onClick={onClick} style={getColorScheme()} {...args}>
                        {children}
                    </button>
                </div>
            );
        case "link":
            return (
                <div className={combinedClassName}>
                    <SmartLink style={{ ...getColorScheme(), ...args.style }} href={href}>
                        {children}
                    </SmartLink>
                </div>
            );
        case "submit":
            return (
                <div className={combinedClassName}>
                    <input type="submit" />;
                </div>
            );
        default:
            return null;
    }
};
