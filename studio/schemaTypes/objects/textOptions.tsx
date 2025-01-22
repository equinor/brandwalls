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
