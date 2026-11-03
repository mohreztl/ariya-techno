import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cyber: { bg: "#0B0F17", card: "#161F30", cyan: "#00F0FF", violet: "#7B2CBF", pink: "#FF2A85" },
      },
      fontFamily: { vazir: ["Vazirmatn", "IRANSans", "Tahoma", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
