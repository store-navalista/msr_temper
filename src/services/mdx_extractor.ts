import fs from "fs";
import path from "path";

export const mdx_extractor = (page_id: string) => {
    try {
        const filePath = path.join(process.cwd(), `/src/content/MDX/${page_id}.mdx`);
        const mdxContent = fs.readFileSync(filePath, "utf8");

        return mdxContent;
    } catch (e) {
        console.log(e);
    }
};
