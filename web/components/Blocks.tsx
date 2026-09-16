import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";

export default function Blocks({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      smallText: ({ children }) => <p className="text-sm">{children}</p>,
      largeText: ({ children }) => (
        <p className="text-2xl leading-snug">{children}</p>
      ),
      extraLargeText: ({ children }) => {
        return (
          <p
            className={`font-medium text-4xl leading-planetary lg:text-5xl 2xl:text-8xl`}
          >
            {children}
          </p>
        );
      },
    },
    marks: {
      sub: ({ children }) => <sub>{children}</sub>,
      sup: ({ children }) => <sup>{children}</sup>,
      s: ({ children }) => <s>{children}</s>,
      highlight: ({ children }) => (
        <span className="text-energy-red-100">{children}</span>
      ),
    },
  };

  return (
    <div className={`portable-text ${className}`}>
      <PortableText components={components} value={value} />
    </div>
  );
}
