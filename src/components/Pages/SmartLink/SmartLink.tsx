"use client";

import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import { AnchorHTMLAttributes } from "react";

type Props = {
    href: string;
    children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const SmartLink = ({ href, children, className, ...rest }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        console.log(href);

        if (href === pathname) {
            NProgress.start();
            setTimeout(() => {
                NProgress.done();
            }, 200);
            return;
        }

        NProgress.start();
        router.push(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className} {...rest}>
            {children}
        </a>
    );
};
