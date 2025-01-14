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

const textOptions = /* groq */ `
  textOptions{
    textAlignment,
    contentXAlignment,
    contentYAlignment,
  }
`

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
        "textOptions":${textOptions}
      },
      _type == "fullWidthVideo" => {
        "type": _type,
        "id": _key,
        "video": videoFile->{
          "url": video.asset->url,
          thumbnail
        },
      },
      _type == "textBlock" => {
          ...,
          "type": _type,
          "id": _key,
          "textOptions":${textOptions},
          text[]{
          ...,
          markDefs[]{
            ...,
          },
          },
        },
        _type == "testSlide" => {
        "type": _type,
        "id": _key,
        title
      },
      }
    }
  }
`)
