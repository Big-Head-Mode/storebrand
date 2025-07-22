const HelloWorld = function (main_string)  {
  const out_str = `Hello, world! Your main_string is ${main_string}`;
  return out_str;
  };

const betterHelloWorld = function (prefix, main_string) {
  const out_str = `Hello, world! Your prefix is ${prefix} and your main_string is ${main_string}`;
  return out_str;
};

const upstreamCanned = function (current_page, current_path) {
  const upstream_root = "https://beeps.website/"; 
  const upstream_source = "https://github.com/querkmachine/beeps.website/blob/main/";
  const upstream_page = upstream_root + current_page;
  const upstream_source_page = upstream_source + current_path;
  const out_str = `🥫ℹ️ **Canned info**: You may want to adapt the upstream blog to your own use case. See the [prod page](${upstream_page}) and [upstream source](${upstream_source})`;
  // const out_str = `moonlanding`;
  return out_str;
};

const pairedCanned = function (content) {

  const upstream_root= "https://beeps.website"; 
  const upstream_source = "https://github.com/querkmachine/beeps.website/blob/main/";
  // content
  const csplit = content.split(" ");
  // skip the first few characters of redundant slashes
  const current_page = csplit[0].substring(1)
  const current_path = csplit[1].substring(2)
  const upstream_page = upstream_root + current_page;
  const upstream_source_page = upstream_source + current_path;
  const out_str = `🥫ℹ️ Canned info: You may want to adapt the upstream blog to your own use case. See the [prod page](${upstream_page}) and [upstream source](${upstream_source_page}). You can search in a new terminal window with ag "search_term". Text on this page is adapted from the linked upstream by beeps. Modifications were made. Upstream text licensed under [CC BY NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/). This page is **NOT** endorsed by beeps.`;
  // const out_str = `moonlanding`;
  return out_str ;
};

// const upstreamCanned = function (prefix, main_string) {
//   const out_str = `Hello, world! Your prefix is ${prefix} and your main_string is ${main_string}`;
//   return out_str;
// };
  
export { HelloWorld, betterHelloWorld, upstreamCanned, pairedCanned };
