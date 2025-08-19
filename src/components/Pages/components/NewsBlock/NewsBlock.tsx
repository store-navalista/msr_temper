import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import css from "./NewsBlock.module.css";
import NewsData from "@/content/news.json" assert { type: "json" };
import { UI } from "@/components/UI";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SmartLink } from "../../SmartLink/SmartLink";

export const NewsBlock = () => {
    const filteredNews = NewsData.slice(-7).reverse();
    // const [isDescriptionVisible, setisDescriptionVisible] = useState(true);

    return (
        <div className={css.news}>
            <h2>News</h2>
            <p className={css.description}>Stay updated with the latest developments regulatory changes and company announcements.</p>
            <Swiper
                spaceBetween={30}
                // centeredSlides={true}
                slidesPerView="auto"
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className={css.swiper}
                // onSlideChange={(swiper) => {
                //     if (swiper.activeIndex === 0) {
                //         setisDescriptionVisible(true);
                //     } else {
                //         setisDescriptionVisible(false);
                //     }
                // }}
            >
                {/* <p style={{ opacity: isDescriptionVisible ? 1 : 0 }} className={css.description}>
                    Stay updated with the latest developments regulatory changes and company announcements.
                </p> */}
                {filteredNews.map((item, index) => {
                    const { id, url, title, time } = item;

                    return (
                        <SwiperSlide key={index} className={css.slide}>
                            <div className={css.desc}>
                                <p className={css.text}>{title}</p>
                                <p className={css.time}>{time}</p>
                            </div>
                            <div className={css.image}>
                                <Image src={`/images/news/${id}-min.jpg`} fill alt="news" />
                            </div>
                            <SmartLink href={`/newsroom?id=${url}`} className={css.link} />
                        </SwiperSlide>
                    );
                })}
                <SwiperSlide className={css.slide} style={{ boxShadow: "none", backgroundColor: "#fff" }}>
                    <UI.Button variant="link" colorScheme="primary" className={css.other_news} href="/newsroom">
                        See other news...
                    </UI.Button>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
