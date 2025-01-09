import { defineQuery } from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export const pagesSlugs = defineQuery(`
  *[_type == "location" && defined(slug.current)]
  {
    "slug": slug.current
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'location' && slug.current == $slug][0]{
    _id,
    _type,
    slug,
    ...
  }
`)

export const getSlideshowsQuery = defineQuery(`
  *[_type == 'slideshow' && (count((showLocations[]->slug.current)[@ in [$slug]]) > 0)][0...30]{
    "type": _type,
    "id": _id,
    title,
    slides[]->{
      scheduling{
        ...,
      },
      content[]{
        _type == "infoBoard" => {
        "type": _type,
        "id": _key,
        sif,
      },
      _type == "fullWidthImage" => {
        "type": _type,
        "id": _key,
        image,
        text[]{
          ...,
          markDefs[]{
            ...,
          },
        },
        contentXAlignment,
        contentYAlignment,
      }
      }
    }
  }
`)
