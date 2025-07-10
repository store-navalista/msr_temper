// import MainSlider from "@/components/Pages/HOME/components/MainSlider";
import { HomeContent } from "@/components/Pages/HOME/HomeContent";
import { generatePageMetadata } from "@/services/seo";
import { StructuredData } from "@/services/structuredData";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: "HOME",
        path: "home",
    });
}

export default async function IndexPage() {
    return (
        <>
            <StructuredData description={""} />
            <HomeContent />
            {/* <MainSlider /> */}
            {/* <NoSSRWrapper>
                <ScreensaverWrapper />
            </NoSSRWrapper> */}
        </>
    );
}
