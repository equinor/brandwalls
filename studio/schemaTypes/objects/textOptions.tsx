import {defineField, Rule} from 'sanity'
import {
  MdAlignHorizontalCenter,
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignVerticalBottom,
  MdAlignVerticalCenter,
  MdAlignVerticalTop,
} from 'react-icons/md'
import {RadioInput} from '../components/RadioInput'

const contentXAlignmentOptions = [
  {value: 'left', icon: MdAlignHorizontalLeft},
  {value: 'center', icon: MdAlignHorizontalCenter},
  {value: 'right', icon: MdAlignHorizontalRight},
]
const contentYAlignmentOptions = [
  {value: 'top', icon: MdAlignVerticalTop},
  {value: 'center', icon: MdAlignVerticalCenter},
  {value: 'bottom', icon: MdAlignVerticalBottom},
]

export default {
  name: 'textOptions',
  type: 'object',
  fields: [
    defineField({
      name: 'useLight',
      type: 'boolean',
      title: 'Use light text color',
      description: 'Default is dark',
    }),
    defineField({
      name: 'applyGradient',
      type: 'boolean',
      title: 'Apply gradient',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Alignment for text',
      description: '',
      type: 'string',
      initialValue: 'left',
      components: {
        input: (props) => <RadioInput {...props} options={contentXAlignmentOptions} />,
      },
    }),
    defineField({
      name: 'screens',
      type: 'screens',
    }),
  ],
}
