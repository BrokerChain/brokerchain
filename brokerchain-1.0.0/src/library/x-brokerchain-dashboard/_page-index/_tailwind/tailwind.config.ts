// initialized by dev/system
import type { Config } from "tailwindcss";
import tailwindcss_forms from "@tailwindcss/forms";
import tailwindcss_container_queries from "@tailwindcss/container-queries";

const config: Config = {
    content: {
        relative: true,
        files: [
            // [note]
            // the pattern here not only match current page, but also other pages
            // this makes cross reference between pages much more easier
            //
            "../../_/**/*.js",
            // share components between pages
            "../../_shared-components/**/*.js",
            // all .tsx code is compiled to .js too for now
            "../../_page-*/**/*.js",
            // html content is generated from here
            "../../make-page-*/**/*.js"
        ]
    },
    plugins: [tailwindcss_forms, tailwindcss_container_queries]
};

export default config;
