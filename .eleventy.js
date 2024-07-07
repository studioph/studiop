
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"src/assets/": "assets/"});
    eleventyConfig.addGlobalData("permalink", () => {
      return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });
    return {
      dir: {
        input: "src/pages",
        layouts: "../layouts",
        output: "www"
      },
      htmlTemplateEngine: "njk",
      
    }
  };