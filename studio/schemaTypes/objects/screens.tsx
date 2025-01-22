import {Box, Card, Grid, Heading, Stack} from '@sanity/ui'
import {Rule} from 'sanity'

const allowedAdjacentScreens = (currentScreen: string) => {
  switch (currentScreen) {
    case '1':
      return ['2', '5']
    case '2':
      return ['3', '6']
    case '3':
      return ['4', '7']
    case '4':
      return ['3', '8']
    case '5':
      return ['1', '6', '9']
    case '6':
      return ['5', '7', '2', '10']
    case '7':
      return ['6', '8', '3', '11']
    case '8':
      return ['7', '4', '12']
    case '9':
      return ['5', '13', '10']
    case '10':
      return ['9', '11', '6', '14']
    case '11':
      return ['10', '12', '7', '15']
    case '12':
      return ['11', '8', '16']
    case '13':
      return ['9', '14']
    case '14':
      return ['13', '15', '10']
    case '15':
      return ['14', '16', '11']
    case '16':
      return ['15', '12']
    default:
      break
  }
}

const verifyScreens = (screens: string[]) => {
  console.log('screens', screens)
  if (screens?.length <= 1) return true
  let hasError = true
  screens?.forEach((currentValue, i, screensArray) => {
    const allowedAdjacent = allowedAdjacentScreens(currentValue)
    console.log(`allowedAdjacent for ${currentValue}`, allowedAdjacent)
    if (
      allowedAdjacent?.includes(screensArray[i - 1]) ||
      allowedAdjacent?.includes(screensArray[i + 1])
    ) {
      console.log('allowedAdjacent for next or past allowed', allowedAdjacent)
      hasError = false
    }
  })
  return hasError ? 'Adjacent screens is not next to each other' : true
}

const ScreensPreview = ({value}: {value: string[]}) => (
  <Box marginTop={2} marginBottom={2}>
    <Heading as="h3" size={0}>
      Preview
    </Heading>
    <Card padding={[3, 3, 4]} radius={2} shadow={1} marginTop={3}>
      <Grid columns={4} rows={4} gap={1}>
        {Array(16)
          .fill(0)
          .map((v, i) => {
            return (
              <Box
                key={`screen_preview_cell_${i}`}
                padding={[3, 3, 4, 5]}
                style={{
                  color: 'black',
                  ...(value &&
                    value?.includes(`${i + 1}`) && {color: 'white', backgroundColor: 'black'}),
                  outline: '1px solid black',
                }}
              >
                {i + 1}
              </Box>
            )
          })}
      </Grid>
    </Card>
  </Box>
)

const PreviewScreensInputComponent = (props: any) => {
  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      <ScreensPreview value={props.value} />
    </Stack>
  )
}
export default {
  title: 'Select screens',
  description: '',
  name: 'screens',
  type: 'array',
  of: [{type: 'string'}],
  options: {
    list: [
      {title: 'Screen 1', value: '1'},
      {title: 'Screen 2', value: '2'},
      {title: 'Screen 3', value: '3'},
      {title: 'Screen 4', value: '4'},
      {title: 'Screen 5', value: '5'},
      {title: 'Screen 6', value: '6'},
      {title: 'Screen 7', value: '7'},
      {title: 'Screen 8', value: '8'},
      {title: 'Screen 9', value: '9'},
      {title: 'Screen 10', value: '10'},
      {title: 'Screen 11', value: '11'},
      {title: 'Screen 12', value: '12'},
      {title: 'Screen 13', value: '13'},
      {title: 'Screen 14', value: '14'},
      {title: 'Screen 15', value: '15'},
      {title: 'Screen 16', value: '16'},
    ],
    layout: 'grid',
  },
  initialValue: 5,
  components: {
    input: PreviewScreensInputComponent,
  },
  validation: (Rule: Rule) => Rule.max(2).custom((value: any) => verifyScreens(value)),
}
