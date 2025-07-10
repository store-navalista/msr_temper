import { NextConfig } from "next";

const config: NextConfig = {
    devIndicators: false,
    transpilePackages: ["next-mdx-remote"],
};

export default config;
