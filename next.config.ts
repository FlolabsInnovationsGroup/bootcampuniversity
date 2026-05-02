import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot
  },
  async redirects() {
    return [
      {
        source: "/resources/student-handbook",
        destination: "/resources/community-playbook",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
