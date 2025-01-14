interface TestSlideProps {
  title?: string
}

export default function TestSlide(props: TestSlideProps) {
  const { title } = props
  const colors = [
    'bg-amber-500',
    'bg-sky-500',
    'bg-red-500',
    'bg-emerald-500',
    'bg-purple-500',
    'bg-yellow-300',
    'bg-blue-900',
    'bg-red-400',
    'bg-teal-700',
    'bg-orange-400',
    'bg-pink-400',
    'bg-sky-400',
    'bg-orange-300',
    'bg-red-600',
    'bg-green-900',
    'bg-violet-950',
  ]
  return (
    <div className="grid h-full w-full grid-cols-4 grid-rows-4">
      {Array(16)
        .fill(0)
        .map((v, i) => {
          return (
            <div
              key={`test_cell_${i}`}
              className={`text-stroke flex h-full w-full items-center justify-center text-xl text-white-100 ${colors[i]}`}
            >
              {i !== 5 ? <div>{i + 1}</div> : <div>{title}</div>}
            </div>
          )
        })}
    </div>
  )
}
