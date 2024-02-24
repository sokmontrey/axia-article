import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
const pretty_opts = {
  theme: "poimandres",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{
        type: "text",
        value: " "
      }];
    }
  },
  onVisitHighlightedLine(node) {
    // Adding a class to the highlighted line
    if (!node.properties.className) node.properties.className = [];
    node.properties.className.push("highlighted");
  }
};
const katex_opts = {};

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, pretty_opts], [rehypeKatex, katex_opts]],
    remarkPlugins: [remarkMath]
  }
});
