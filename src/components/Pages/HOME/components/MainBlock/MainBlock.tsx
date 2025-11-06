import { FC } from "react";
import css from "./MainBlock.module.css";
import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };
import ReactPlayer from "react-player";
import right_block_css from "./RightBlock.module.css";

export const MainBlock: FC = () => {
    const width = 1300;
    const ratio = 0.675;
    const decors = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <section className={css.main_block}>
            <div className={css.slider}>
                <div className={css.left}>
                    <div className={css.content_block}>
                        <h1>{Content.Home.h1}</h1>
                        <p>{Content.Home.description}</p>
                        <UI.Button variant="link" colorScheme="tertiary" href="#request-form" style={{ padding: "14px 24px" }}>
                            {Content.Home.button}
                        </UI.Button>
                        <div className={css.dark_curtain} />
                    </div>
                </div>
                <div className={right_block_css.right_block}>
                    <div className={right_block_css.video_block}>
                        {decors.map((_, i) => {
                            return <span key={i} />;
                        })}
                        <ReactPlayer className={right_block_css.video} muted={true} loop autoPlay={true} src="/video/main-block-1.mp4" style={{ width: `${width}px`, height: `${width * ratio}px` }} />
                    </div>
                </div>
            </div>
            <div className={css.footer}>
                <p>Mediterranean Shipping Register provides classification and compliance services to the marine industry.</p>
                <p>As trusted maritime advisors, we collaborate with clients to enhance performance throughout the ocean economy.</p>
                <p>Our team is globally recognized for its profound technical knowledge, integrity, and professional excellence.</p>
            </div>
        </section>
    );
};
