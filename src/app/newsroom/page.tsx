import NewsContentClient from "@/components/News";
import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: "NEWS",
        path: "newsroom",
    });
}

export default async function IndexPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id: page_ID } = await searchParams;

    return page_ID ? (
        <Template {...{ page_ID }} templateType="news">
            asdas
        </Template>
    ) : (
        <NewsContentClient />
    );
}
