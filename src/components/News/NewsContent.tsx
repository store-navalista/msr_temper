"use client";

import NewsData from "@/content/news.json" assert { type: "json" };
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useAnimateOnView } from "../hooks/useAnimateOnView";
import { SVG } from "../SVG";
import css from "./NewsContent.module.css";
import { SmartLink } from "../Pages/SmartLink/SmartLink";

type ItemType = {
    id: number;
    url: string;
    time: string;
    title: string;
};

const PAGE_SIZE = 5;

const New: FC<{ index: number; item: ItemType }> = ({ index, item }) => {
    const delay = index < 5 ? index * 0.1 : 0;
    const { ref, animation } = useAnimateOnView("none", delay, 0.1, 1);
    const { id, url, time, title } = item;

    return (
        <motion.div ref={ref} className={css.new} {...animation}>
            <SmartLink href={`?id=${url}`} className={css.link}>
                <div className={css.icon}>
                    <Image src={`/images/news/${id}-min.jpg`} fill alt="news icon" />
                    <SVG.Eye className={css.eye} />
                </div>
                <div className={css.content}>
                    <p className={css.description}>{title}</p>
                    <p className={css.date}>{time}</p>
                </div>
                <div className={css.gif}>
                    <Image src="/gifs/cat.gif" alt="Animated GIF" width={20} height={20} unoptimized />
                </div>
            </SmartLink>
        </motion.div>
    );
};

export const NewsContent = () => {
    const isScreen = useMediaQuery({ query: "(min-width: 1176px)" });
    const data = NewsData.slice(-50).reverse();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const paginatedData = data.slice(0, page * PAGE_SIZE);
    const hasMore = paginatedData.length < data.length;

    useEffect(() => {
        if (!hasMore || loading) return;
        const observer = new window.IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLoading(true);
                    setTimeout(() => {
                        setPage((p) => p + 1);
                        setLoading(false);
                    }, 800);
                }
            },
            { root: null, rootMargin: "0px", threshold: 0.1 }
        );
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasMore, loading]);

    return (
        <div style={{ position: "relative" } as React.CSSProperties} className={css.block}>
            <div className={css.top_mirror}>
                <h1 className={css.mirror_title}>News</h1>
            </div>
            <div className={css.news_block}>
                <motion.div className={css.news} initial={{ x: isScreen ? 225 : 0 }} animate={{ x: 0 }} transition={{ duration: 0.5, delay: 1 }}>
                    {paginatedData.map((item, index) => (
                        <Fragment key={index}>
                            <New index={index} item={item} />
                        </Fragment>
                    ))}
                    {loading && (
                        <div className={css.loader}>
                            <Image src="/images/svg/loader.svg" alt="Loading..." width={30} height={30} />
                        </div>
                    )}
                    {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
                </motion.div>
                {isScreen && <motion.div className={css.image} initial={{ opacity: 0, filter: "blur(50px)" }} animate={{ opacity: 1, filter: "blur(0)" }} transition={{ duration: 0.3, delay: 1.5 }} />}
            </div>
        </div>
    );
};
