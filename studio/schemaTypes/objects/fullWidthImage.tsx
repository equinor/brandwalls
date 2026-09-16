import { defineField, type PortableTextBlock, type Reference } from "sanity";
import { configureBlockContent } from "../editors/blockContentType";
import { validateCharCounterEditor } from "../validations/validateCharCounterEditor";

const blockContentType = configureBlockContent();

export default {
  name: "fullWidthImage",
  title: "Full width image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "containImage",
      type: "boolean",
      title: "Contain image",
      description: `Add a padding around image/svg and scales image to maintain aspect ratio while fitting within the element's content box`,
    }),
    defineField({
      name: "noAnimation",
      type: "boolean",
      title: "No animation",
      description: `Removes the zoom effect on image`,
    }),
    defineField({
      name: "text",
      title: "Text content",
      type: "array",
      //@ts-ignore
      of: [blockContentType],
      validation: (Rule) =>
        Rule.custom((value) => {
          return validateCharCounterEditor(
            value as PortableTextBlock[],
            600,
            true,
          );
        }).error(),
    }),
    defineField({
      name: "textOptions",
      type: "textOptions",
    }),
  ],
  preview: {
    select: {
      image: "image.asset",
      textOptions: "textOptions",
    },
    prepare({
      image,
      textOptions,
    }: {
      alt: string;
      image: Reference;
      textOptions: any;
    }) {
      return {
        title: `Fullwidth image component`,
        subtitle: `Screens: ${Array(textOptions?.screens).toString()}`,
        media: image,
      };
    },
  },
};
