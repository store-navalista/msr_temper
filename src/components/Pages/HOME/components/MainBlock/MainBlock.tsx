import { FC, useEffect, useRef, useState } from "react";
import css from "./MainBlock.module.css";
import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };
import ReactPlayer from "react-player";
import right_block_css from "./RightBlock.module.css";
import clsx from "clsx";
// import { useMediaQuery } from "react-responsive";

export const MainBlock: FC = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const playerRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isVideoLoaded) {
                setIsVideoLoaded(true); // Fallback
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [isVideoLoaded]);

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
                <div className={right_block_css.right_block}>
                    <div className={right_block_css.video_block} style={{ opacity: isVideoLoaded ? 1 : 0 }}>
                        <ReactPlayer ref={playerRef} className={right_block_css.video} muted={true} loop autoPlay={true} src="/video/main-block-1.mp4" />
                    </div>
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
