import { BiSlideshow } from 'react-icons/bi';
import { defineField } from 'sanity';

export default {
  type: 'document',
  name: 'slideshow',
  title: 'Slideshow',
  icon: BiSlideshow,
  fieldsets: [],
  fields: [
    defineField({
      name: 'title',
      title: 'Name of slideshow',
      type: 'string',
    }),
    defineField({
      name: 'showLocations',
      title: 'Show in locations',
      type: 'array',
      description: 'Select which locations this slideshow should appear on.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'location' }],
        },
      ],
      options: {},
    }),
    /*     defineField({
      name: 'slides',
      type: 'array',
      title: 'Slides',
      of: [{ type: 'slide' }].filter((e) => e),
    }), */
    defineField({
      name: 'slides',
      title: 'Slide content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'slide' }],
        },
      ],
      options: {},
    }),
  ].filter((e) => e),
  orderings: [
    {
      title: 'Title ',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      location0: 'showLocations.0.title',
      location1: 'showLocations.1.title',
      location2: 'showLocations.2.title',
      location3: 'showLocations.3.title',
      location4: 'showLocations.4.title',
      location5: 'showLocations.5.title',
    },
    prepare(selection: any) {
      const { title, ...locations } = selection;
      const locationTitles = Object.values(locations).filter(Boolean);
      const locationSubtitle =
        locationTitles.length > 0
          ? locationTitles.join(', ')
          : 'No locations set';
      return {
        title: title,
        subtitle: `${locationSubtitle}`,
      };
    },
  },
};
