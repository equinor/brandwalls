// @ts-nocheck

const SafetyHelmet = ({
  width = 130,
  height = 130,
  className = '',
}: {
  width?: number
  height?: number
  className?: string
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      fill="currentColor"
      viewBox="0 0 130 130"
      enableBackground="new 0 0 130 130"
      width={width}
      height={height}
      className={className}
    >
      {/*       <metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
        <rdf:RDF>
          <dc:rights>
            <rdf:Alt>
              <rdf:li xml:lang="x-default">Equinor</rdf:li>
            </rdf:Alt>
          </dc:rights>
        </rdf:RDF>
      </metadata> */}
      <g>
        <path
          fill="currentColor"
          d="M113.489,97.161H7.601c-1.385,0-2.512-1.124-2.512-2.506C5.084,78.993,10.485,63.376,19.908,51.81
		c9.967-12.233,23.419-18.971,37.88-18.971c32.187,0,45.649,31.971,49.009,41.77c0.254,0.74,0.618,1.254,1.083,1.527l14.761,7.459
		c1.705,0.979,1.647,3.696,1.102,5.736C122.731,93.117,119.507,97.161,113.489,97.161z M8.091,94.161h105.398
		c3.598,0,5.489-1.88,6.442-3.456c1.153-1.905,1.279-3.918,1.09-4.568l-14.578-7.368c-1.184-0.692-1.991-1.749-2.484-3.187
		c-3.196-9.323-15.973-39.743-46.171-39.743c-13.542,0-26.168,6.345-35.554,17.865C13.338,64.624,8.198,79.344,8.091,94.161z"
        />
      </g>
      <g>
        <path
          fill="currentColor"
          d="M59.912,78.575H8.775v-3h51.137c11.49,0,27.314-2.396,32.063-23.113l2.924,0.67
		C89.068,78.575,67.123,78.575,59.912,78.575z"
        />
      </g>
    </svg>
  )
}

export default SafetyHelmet
