import React from "react";
import { GOOGLE_BUSINESS_URL } from "./seo";

type StructuredDataProps = {
    description: string;
};

export const StructuredData = ({ description }: StructuredDataProps) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "Navalista LLC",
                url: "https://msregister.com",
                image: "https://msregister.com/images/logo.png",
                description,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "пер. Госпитальеров, 13",
                    addressLocality: "Одесса",
                    addressCountry: "UA",
                },
                telephone: "+380 00 000 0000",
                sameAs: [GOOGLE_BUSINESS_URL],
            }),
        }}
    />
);
