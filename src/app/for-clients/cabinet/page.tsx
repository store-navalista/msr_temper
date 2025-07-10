import { generatePageMetadata } from "@/services/seo";
import { ClientCabinet } from "@/components/Pages/CLIENT/CLIENT_CABINET/ClientCabinet";

const page_ID = "CLIENT";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "for-clients",
    });
}

export default function IndexPage() {
    return <ClientCabinet />;
}
