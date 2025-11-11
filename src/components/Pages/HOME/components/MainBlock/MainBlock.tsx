import { FC, useEffect, useState } from "react";
import css from "./MainBlock.module.css";
import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };
import ReactPlayer from "react-player";
import right_block_css from "./RightBlock.module.css";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
// import { useMediaQuery } from "react-responsive";

export const MainBlock: FC = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isVideoLoaded) {
                setIsVideoLoaded(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [isVideoLoaded]);

    const ap = {
        initial: {
            opacity: 0,
            transform: "rotateX(0deg) rotateY(0deg)",
        },
        animate: {
            opacity: 1,
            transform: "rotateX(0deg) rotateY(-1deg)",
        },
    };

    return (
        <section className={css.main_block}>
            <div className={css.slider}>
                <div className={css.left}>
                    <div className={clsx(css.content_block, isVideoLoaded ? css.animate : "")}>
                        <div className={css.curtain} />
                        <h1>{Content.Home.h1}</h1>
                        <p>{Content.Home.description}</p>
                        <UI.Button variant="link" colorScheme="tertiary" href="#request-form" style={{ padding: "14px 24px" }}>
                            {Content.Home.button}
                        </UI.Button>
                        <div className={css.dark_curtain} />
                    </div>
                </div>
                <div className={right_block_css.right_block} style={{ borderColor: isVideoLoaded ? "#fff" : "#ffffff" }}>
                    {!isVideoLoaded ? (
                        <Image src="/images/svg/loader.svg" width={50} height={50} alt="loader" />
                    ) : (
                        <motion.div initial={ap.initial} animate={ap.animate} transition={{ duration: 0.7, delay: 0.2 }} className={right_block_css.video_block}>
                            <ReactPlayer className={right_block_css.video} muted={true} loop autoPlay={true} src="/video/main-block-1.mp4" />
                        </motion.div>
                    )}
                </div>
            </div>
            <div className={css.footer}>
                <div>
                    <p>Mediterranean Shipping Register provides classification and compliance services to the marine industry.</p>
                    <p>As trusted maritime advisors, we collaborate with clients to enhance performance throughout the ocean economy.</p>
                    <p>Our team is globally recognized for its profound technical knowledge, integrity, and professional excellence.</p>
                </div>
            </div>
        </section>
    );
};
