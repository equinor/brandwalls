import type { FullWidthImage } from "@/sanity.types";
import SanityImage from "../core/SanityImage/SanityImage";
import TextBlock from "./TextBlock";

type FullscreenImageProps = FullWidthImage;

export default function FullscreenImage(props: FullscreenImageProps) {
  const {
    image,
    text,
    textOptions,
    containImage = false,
    noAnimation = false,
  } = props;
  return (
    <div className={`relative h-full w-full`}>
      <div
        className={`${!containImage ? "absolute inset-0 z-0" : "h-full w-full"}`}
      >
        <SanityImage
          image={image}
          contain={containImage}
          cover={true}
          className={`${!noAnimation ? "animate-zoomIn" : ""}`}
        />
      </div>
      {text && (
        <div className="relative z-1 h-full w-full">
          <TextBlock
            //@ts-ignore: TODO
            text={text}
            textOptions={textOptions}
          />
        </div>
      )}
    </div>
  );
}
