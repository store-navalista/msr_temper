"use client";

import { useEffect } from "react";

type Props = {
    error: Error;
    reset(): void;
};

export default function Error({ error }: Props) {
    // const t = useTranslations("Error");

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            {/* {t.rich("description", {
                    p: (chunks) => <p className="mt-4">{chunks}</p>,
                    retry: (chunks) => (
                        <button onClick={reset} type="button">
                            {chunks}
                        </button>
                    ),
                })} */}
        </div>
    );
}
