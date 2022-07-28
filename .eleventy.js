const fs = require("fs-extra");

// Other packages
const { DateTime } = require("luxon");
const sass = require("sass");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");

// 11ty plugins
const pluginImages = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Set the site domain
  // If the script is simply 'eleventy' then it's the build script,
  // so use the actual domain for that.
  eleventyConfig.addGlobalData(
    "siteDomain",
    process.env.npm_lifecycle_script === "eleventy" ? "https://berly.kim" : null
  );

  // Load plugins
  eleventyConfig.addPlugin(pluginRss);

  // Global settings
  eleventyConfig.setDataDeepMerge(true);

  // Copy JS and UI images
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/js");

  // Copy .htaccess
  eleventyConfig.addPassthroughCopy(".htaccess");

  // Copy favicons/OpenGraph images
  eleventyConfig.addPassthroughCopy("favicon*");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("safari-pinned-tab.svg");
  eleventyConfig.addPassthroughCopy("opengraph.png");

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    tagSet = filterTagList([...tagSet]);
    return tagSet.sort();
  });

  // Create a function to filter tags in template
  eleventyConfig.addFilter("filterTagList", filterTagList);

  // Tag filter helper function
  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "blog", "nav", "post", "posts"].indexOf(tag) === -1
    );
  }

  // Sass/PostCSS pipeline
  eleventyConfig.on("beforeBuild", () => {
    const result = sass.renderSync({
      file: "assets/stylesheet.scss",
      sourceMap: false,
      outputStyle: "compressed",
    });
    console.log("Sass compiled.");

    let css = result.css.toString();
    postcss([postcssPresetEnv()])
      .process(css, { from: "stylesheet.scss", to: "assets/stylesheet.css" })
      .then((result) => {
        fs.outputFile("_site/assets/stylesheet.css", result.css, (err) => {
          if (err) console.error(err);
          console.log("PostCSS transformations complete.");
        });
      });
  });

  // Responsive images shortcode
  eleventyConfig.addNunjucksAsyncShortcode(
    "responsiveImage",
    async function (src, alt, aside = false) {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveImage from: ${src}`);
      }

      let metadata = await pluginImages(src, {
        widths: [300, 600, 900, null],
        formats: ["webp"],
        urlPath: "/images/",
        outputDir: "./_site/images/",
        sharpOptions: {
          animated: true,
        },
      });

      let originalSize = metadata.webp[metadata.webp.length - 1];

      return `<picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(", ")}" sizes="100vw">`;
        })
        .join("\n")}
        <img
          class="${aside ? "kimProse_aside" : null}"
          src="${originalSize.url}"
          width="${originalSize.width}"
          height="${originalSize.height}"
          alt="${alt}">
      </picture>`;
    }
  );

  // Date formats
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "d LLLL yyyy"
    );
  });
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Generate a string we can use for asset cachebusting
  // https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
  eleventyConfig.addFilter("cachebust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", DateTime.local().toFormat("X"));
    return `${urlPart}?${params}`;
  });

  // Smartquotes filter so I stop getting annoyed at seeing incorrect quote marks everywhere
  // https://charliepark.org/smartquotes_in_eleventy/
  eleventyConfig.addFilter("smartquotes", (post) => {
    const apostrophes = new RegExp(/(?<=<(h|l|p[^r]).*)\b'\b/g);
    const years = new RegExp(/(?<=\s)'(?=\d)/g);
    const openDoubles = new RegExp(/(?<=<(h|l|p[^r]).*)(?<=\s|>)&quot;/g);
    const closeDoubles = new RegExp(
      /(?<=<(h|l|p[^r]).*“.*)&quot;(?=(\s|\p{P}|<))/gu
    );
    const openSingles = new RegExp(/(?<=<(h|l|p[^r]).*)(?<=\s|>)'/g);
    const closeSingles = new RegExp(
      /(?<=<(h|l|p[^r]).*‘.*)'(?=(\s|\p{P}|<))/gu
    );
    return post
      .replace(apostrophes, "’")
      .replace(years, "’")
      .replace(openDoubles, "“")
      .replace(closeDoubles, "”")
      .replace(openSingles, "‘")
      .replace(closeSingles, "’");
  });

  // Helper function (filter?) that determines if the current page is a blog
  // post or not by looking for /blog/ in the URL. Yeah, I don't know if
  // there's a better way of doing this in Eleventy.
  eleventyConfig.addFilter("isBlogPost", (postUrl) => {
    return postUrl.substring(0, 6) === "/blog/" ? true : false;
  });

  // Layouts
  eleventyConfig.addLayoutAlias("blog-post", "blog-post.njk");

  return {
    markdownTemplateEngine: "njk",
    dir: {
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
