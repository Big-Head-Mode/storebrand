const fs = require("fs-extra");

// Config
const paths = require("./paths.config.json");

// Other packages
const { DateTime } = require("luxon");
const sass = require("sass");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const yargs = require("yargs").argv;

// 11ty plugins
const pluginImages = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginToc = require("eleventy-plugin-toc");

module.exports = function (eleventyConfig) {
  // Set global constants
  eleventyConfig.addGlobalData("siteName", "beeps");
  eleventyConfig.addGlobalData(
    "siteDomain",
    yargs.serve ? "" : "https://beeps.website"
  );

  // Load plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginToc);

  // Global settings
  eleventyConfig.setDataDeepMerge(true);

  // Copy JS and UI images
  eleventyConfig.addPassthroughCopy(paths.srcAssets + "/images");
  eleventyConfig.addPassthroughCopy(paths.srcAssets + "/javascript");

  // Copy .htaccess
  eleventyConfig.addPassthroughCopy(paths.src + "/.htaccess");

  // Copy favicons/OpenGraph images
  eleventyConfig.addPassthroughCopy(paths.src + "/android-chrome-*");
  eleventyConfig.addPassthroughCopy(paths.src + "/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy(paths.src + "/browserconfig.xml");
  eleventyConfig.addPassthroughCopy(paths.src + "/favicon*");
  eleventyConfig.addPassthroughCopy(paths.src + "/mstile-*");
  eleventyConfig.addPassthroughCopy(paths.src + "/safari-pinned-tab.svg");
  eleventyConfig.addPassthroughCopy(paths.src + "/site.webmanifest");

  // Markdown configuration
  const markdownLibary = markdownIt({
    html: true,
    typographer: true,
  }).use(markdownItAnchor, {
    tabIndex: false,
  });
  eleventyConfig.setLibrary("md", markdownLibary);

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
      file: paths.srcAssets + "/stylesheet.scss",
      sourceMap: false,
      outputStyle: "compressed",
    });
    console.log("Sass compiled.");

    let css = result.css.toString();
    postcss([postcssPresetEnv()])
      .process(css, { from: "stylesheet.scss", to: "assets/stylesheet.css" })
      .then((result) => {
        fs.outputFile(
          paths.outputAssets + "/stylesheet.css",
          result.css,
          (err) => {
            if (err) console.error(err);
            console.log("PostCSS transformations complete.");
          }
        );
      });
  });

  // Figure shortcode
  eleventyConfig.addPairedNunjucksShortcode("figure", function (content, args) {
    let html = `<figure class="kimFigure${
      args.float ? " kimFigure-" + args.float : ""
    }">${content}`;
    if (args.caption) {
      html += `<figcaption class="kimFigure_caption">${args.caption}</figcaption>`;
    }
    html += `</figure>`;
    return html;
  });

  // Callout text shortcode
  eleventyConfig.addPairedNunjucksShortcode(
    "callout",
    function (content, args) {
      // The markdown parser gets angry without the newlines
      return `<div class="kimCallout">\n${content}</div>`;
    }
  );

  // Responsive images shortcode
  eleventyConfig.addNunjucksAsyncShortcode(
    "responsiveImage",
    async function (src, alt) {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveImage from: ${src}`);
      }

      let metadata = await pluginImages(src, {
        widths: [600, 900, 1200, null],
        formats: ["webp"],
        urlPath: paths.src + "/images/",
        outputDir: paths.output + "/images/",
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
          src="${originalSize.url}"
          width="${originalSize.width}"
          height="${originalSize.height}"
          alt="${alt}">
      </picture>`;
    }
  );

  // Split text across several lines based on max number of characters per line
  // https://fettblog.eu/11ty-automatic-twitter-cards/
  eleventyConfig.addFilter("splitlines", function (input, maxChars = 20) {
    const parts = input.split(" ");
    const lines = parts.reduce(function (prev, current) {
      if (!prev.length) {
        return [current];
      }
      let lastOne = prev[prev.length - 1];
      if (lastOne.length + current.length > maxChars) {
        return [...prev, current];
      }
      prev[prev.length - 1] = lastOne + " " + current;
      return prev;
    }, []);
    return lines;
  });

  // Date formats
  eleventyConfig.addFilter("formatDate", (dateObj, format) => {
    const date = DateTime.fromJSDate(dateObj, { zone: "utc" });
    if (format === "iso") {
      return date.toISODate();
    } else if (format === "human") {
      return date.toFormat("d LLLL yyyy");
    } else {
      return date.toFormat(format);
    }
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Format tags like hashtags (but with dashes)
  eleventyConfig.addFilter("tagify", (tag) => {
    return `#${tag.replace(" ", "-")}`;
  });

  // Generate a string we can use for asset cachebusting
  // https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
  eleventyConfig.addFilter("cachebust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", DateTime.local().toFormat("X"));
    return `${urlPart}?${params}`;
  });

  // Helper function (filter?) that determines if the current page is a blog
  // post or not by looking for /blog/ in the URL. Yeah, I don't know if
  // there's a better way of doing this in Eleventy.
  eleventyConfig.addFilter("isBlogPost", (postUrl) => {
    return postUrl.substring(0, 6) === "/blog/" ? true : false;
  });

  // Generate Opengraph images
  // https://bnijenhuis.nl/notes/2021-05-10-automatically-generate-open-graph-images-in-eleventy/
  eleventyConfig.on("afterBuild", () => {
    const socialPreviewImagesDir = paths.output + "/images/opengraph/";
    fs.readdir(socialPreviewImagesDir, (err, files) => {
      if (err) throw err;
      files.forEach((filename) => {
        if (filename.endsWith(".svg")) {
          let imageUrl = socialPreviewImagesDir + filename;
          pluginImages(imageUrl, {
            formats: ["png"],
            outputDir: socialPreviewImagesDir,
            filenameFormat: (id, src, width, format, options) => {
              let outputFilename = filename.substring(0, filename.length - 4);
              return `${outputFilename}.${format}`;
            },
          });
        }
      });
    });
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: paths.src,
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
