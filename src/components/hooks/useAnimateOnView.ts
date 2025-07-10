import { useInView } from "react-intersection-observer";
import { useMemo } from "react";

type Direction = "left" | "right" | "top" | "bottom" | "none";

export const useAnimateOnView = (direction: Direction = "bottom", delay = 0, threshold = 0.2, duration = 0.6) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold,
    });

    const animation = useMemo(() => {
        const getOffset = (): { x?: number; y?: number } => {
            switch (direction) {
                case "left":
                    return { x: -50 };
                case "right":
                    return { x: 50 };
                case "top":
                    return { y: -50 };
                case "bottom":
                    return { y: 50 };
                case "none":
                    return { x: 0, y: 0 };
                default:
                    return { x: 0, y: 0 };
            }
        };

        return {
            initial: { opacity: 0, ...getOffset() },
            animate: inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getOffset() },
            transition: { duration, delay, ease: "easeOut" },
        };
    }, [inView, direction, duration, delay]);

    return { ref, animation };
};
