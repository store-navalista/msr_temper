import { RoutesTypes } from "@/constants/routes";
import SEO from "@/content/seo.json" assert { type: "json" };

type MetaDataType = {
    namespace: RoutesTypes | "Global";
    path?: string;
};

const BASE_URL = "https://msregister.com";
export const GOOGLE_BUSINESS_URL = "https://www.google.com/maps?cid=10199519041545729038";

export async function generatePageMetadata({ namespace, path = "" }: MetaDataType) {
    const url = `${BASE_URL}/${path ? `/${path}` : ""}`;
    const data = SEO[namespace];

    if (!("title" in data) || !("description" in data)) {
        throw new Error(`SEO data for namespace "${namespace}" is missing 'title' or 'description'`);
    }

    const { title, description } = data;

    const fullTitle = `${title} | ${SEO.Global.siteName}`;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: SEO.Global.siteName,
            images: [
                {
                    url: `${BASE_URL}/images/opengraph/${path}.jpg`,
                    width: 800,
                    height: 600,
                },
            ],
        },
        // twitter: {
        //     card: "summary_large_image",
        //     title: `${t("meta.title")} | ${g("site")}`,
        //     description: t("meta.description"),
        //     images: [`${BASE_URL}/images/opengraph/${path}.jpg`],
        // },
        // metadataBase: new URL(GOOGLE_BUSINESS_URL),
        // other: {
        //     "google-business-profile": GOOGLE_BUSINESS_URL,
        // },
        // structuredData: {
        //     "@context": "https://schema.org",
        //     "@type": "LocalBusiness",
        //     name: g("site"),
        //     url: BASE_URL,
        //     image,
        //     address: {
        //         "@type": "PostalAddress",
        //         addressCountry: "UA",
        //     },
        //     sameAs: [GOOGLE_BUSINESS_URL],
        // },
    };
}
