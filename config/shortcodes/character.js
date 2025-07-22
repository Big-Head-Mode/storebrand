import paths from "../paths.js";
import pluginImages from "@11ty/eleventy-img";

// List of available variants, images and alt text
const variants = {
  ali: [
    {
      name: "angry",
      image: "angry.png",
      alt: "An alarmed looking robot bat.",
    },
    {
      name: "hearts",
      image: "hearts.svg",
      alt: "A robot bat gesturing angrily.",
    },
  ],
  mabel: [
    {
      name: "angry",
      image: "angry.png",
      alt: "An alarmed looking robot bat.",
    },
    {
      name: "hearts",
      image: "hearts.svg",
      alt: "A robot bat gesturing angrily.",
    },
  ],
};

const characterShortcode = function (content, args) {
  if (!args.variant) {
    throw new Error(`Missing \`variant\` argument on character shortcode.`);
  }

  const character = args.character || "emy";
  const variant = variants[character].find((i) => i.name === args.variant);

  const imagePath = `${paths.srcAssets}/images/${character}/${variant.image}`;
  const imageConfig = {
    widths: [150],
    formats: ["webp"],
    urlPath: `/images/${character}/`,
    outputDir: `${paths.output}/images/${character}/`,
  };

  // Process image
  pluginImages(imagePath, imageConfig);

  // Get image metadata, even if the above isn't finished yet
  const imageMeta = pluginImages.statsSync(imagePath, imageConfig);
  const image = imageMeta.webp[imageMeta.webp.length - 1];

  return `<figure class="kimCharacter kimCharacter-${character}">
    <figcaption class="kimCharacter_cite">
      <img
        class="kimCharacter_image"
        src="${image.url}"
        width="${image.width}"
        height="${image.height}"
        alt="${variant.alt}">
    </figcaption>
    <blockquote class="kimCharacter_speech">\n${content}</blockquote>
  </figure>`;
};

export default characterShortcode;
