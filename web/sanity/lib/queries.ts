import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const pagesSlugs = defineQuery(`
  *[_type == "location" && defined(slug.current)]
  {"slug": slug.current}
`);

export const getPageQuery = defineQuery(`
  *[_type == 'location' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
    },
  }
`);