import type { PortableTextBlock } from "next-sanity";
import { useMemo } from "react";
import type { TextOptions } from "@/sanity.types";
import Blocks from "../Blocks";

type TextBlockProps = {
  text: PortableTextBlock[];
  textOptions?: TextOptions;
};

const FirstColumnScreens = ["1", "5", "9", "13"];
const SecondColumnScreens = ["2", "6", "10", "14"];
const ThirdColumnScreens = ["3", "7", "11", "15"];
const FourthColumnScreens = ["4", "8", "12", "16"];
const FirstRowScreens = ["1", "2", "3", "4"];
const SecondRowScreens = ["5", "6", "7", "8"];
const ThirdRowScreens = ["9", "10", "11", "12"];
const FourthRowScreens = ["13", "14", "15", "16"];

const arrayIncludesScreen = (arr: string[], screen: string) =>
  arr.some((v) => {
    return parseInt(screen, 10) === parseInt(v, 10);
  });

const getColumnUtility = (screen: string, hasAdjacentScreen: boolean) => {
  if (arrayIncludesScreen(FirstColumnScreens, screen)) {
    return `col-start-1 ${hasAdjacentScreen ? "col-end-3" : "col-end-2"}`;
  }
  if (arrayIncludesScreen(SecondColumnScreens, screen)) {
    return `col-start-2 ${hasAdjacentScreen ? "col-end-4" : "col-end-2"}`;
  }
  if (arrayIncludesScreen(ThirdColumnScreens, screen)) {
    return `col-start-3 ${hasAdjacentScreen ? "col-end-5" : "col-end-3"}`;
  }
  if (arrayIncludesScreen(FourthColumnScreens, screen)) {
    return "col-start-4 col-end-5";
  }
};
const getRowUtility = (screen: string, hasAdjacentScreen: boolean) => {
  if (arrayIncludesScreen(FirstRowScreens, screen)) {
    return `row-start-1 ${hasAdjacentScreen ? "row-end-3" : "row-end-2"}`;
  }
  if (arrayIncludesScreen(SecondRowScreens, screen)) {
    return `row-start-2 ${hasAdjacentScreen ? "row-end-4" : "row-end-2"}`;
  }
  if (arrayIncludesScreen(ThirdRowScreens, screen)) {
    return `row-start-3 ${hasAdjacentScreen ? "row-end-5" : "row-end-3"}`;
  }
  if (arrayIncludesScreen(FourthRowScreens, screen)) {
    return "row-start-4 row-end-4";
  }
};

const getGridContentAlignment = (screen: string) => {
  return arrayIncludesScreen(
    [...FirstColumnScreens, ...SecondColumnScreens],
    screen,
  )
    ? "justify-self-start"
    : "justify-self-end";
};

export default function TextBlock({ text, textOptions }: TextBlockProps) {
  const { useLight, applyGradient, screens, textAlignment } = textOptions || {};

  const sortedScreens = useMemo(
    () =>
      screens
        ? screens?.sort(function (a: string, b: string) {
            return Number(a) - Number(b);
          })
        : ["5"],
    [screens],
  );
  //Restricted in studio to only 2
  const hasAdjacentColumn = useMemo(() => {
    return sortedScreens?.length > 1;
  }, [sortedScreens]);

  const getTextAlignX = () => {
    switch (String(textAlignment)) {
      case "right":
        return "text-right";
      case "center":
        return "text-center";
      default:
        return "text-left";
    }
  };

  const getPlacement = (
    screen: string,
    hasAdjacentColumnScreen: boolean,
    hasAdjacentRowScreen: boolean,
  ) => {
    const x =
      getColumnUtility(screen, hasAdjacentColumnScreen) ??
      "col-start-2 col-end-2";
    const y =
      getRowUtility(screen, hasAdjacentRowScreen) ?? "row-start-2 row-end-2";
    return { x, y };
  };

  const getPosition = () => {
    //Restricted in studio to only 2
    if (sortedScreens?.length <= 1) {
      return getPlacement(sortedScreens[0], false, false);
    }
    // if adjacent screen is on next column
    if (hasAdjacentColumn) {
      return getPlacement(sortedScreens[0], true, false);
    }
    //then it must be next row
    return getPlacement(sortedScreens[0], false, true);
  };

  const getPadding = (asMargin = false, useGlass = false) => {
    const usesFirstColumn = FirstColumnScreens.some((fcs: string) => {
      return sortedScreens.some(
        (screen: string) => parseInt(fcs, 10) === parseInt(screen, 10),
      );
    });
    const usesLastColumn = FourthColumnScreens.some((fcs: string) => {
      return sortedScreens.some(
        (screen: string) => parseInt(fcs, 10) === parseInt(screen, 10),
      );
    });
    const usesFirstRow = FirstRowScreens.some((fcs: string) => {
      return sortedScreens.some(
        (screen: string) => parseInt(fcs, 10) === parseInt(screen, 10),
      );
    });
    const usesLastRow = FourthRowScreens.some((fcs: string) => {
      return sortedScreens.some(
        (screen: string) => parseInt(fcs, 10) === parseInt(screen, 10),
      );
    });

    if (asMargin) {
      return [
        usesFirstColumn ? "ms-6xl" : "",
        usesLastColumn ? "me-6xl" : "",
        usesFirstRow ? "mt-6xl" : "",
        usesLastRow ? "mb-6xl" : "",
      ].join(" ");
    }

    return [
      usesFirstColumn ? (useGlass ? "ps-4xl" : "ps-6xl") : "ps-2xl",
      usesLastColumn ? (useGlass ? "pe-4xl" : "pe-6xl") : "pe-2xl",
      usesFirstRow ? (useGlass ? "pt-4xl" : "pt-6xl") : "pt-2xl",
      usesLastRow ? (useGlass ? "pb-4xl" : "pb-6xl") : "pb-2xl",
    ].join(" ");
  };

  return (
    <div className={`grid h-full w-full grid-cols-4 grid-rows-4`}>
      {text &&
        (() => {
          const useGlass = applyGradient || useLight;
          const placementClassName = `${getPosition().x} ${getPosition().y} ${getGridContentAlignment(sortedScreens[0])} ${getTextAlignX()} text-balance`;
          const textClassName = `h-fit w-fit max-w-full max-h-none ${placementClassName}`;
          const blocks = (
            <Blocks
              value={text}
              className={`${textClassName} ${useGlass ? "px-12 py-8 lg:px-16 lg:py-12" : getPadding()}`}
            />
          );

          return useGlass ? (
            <div
              className={`glass-border relative h-fit w-fit min-w-0 max-w-full ${placementClassName} ${getPadding(true)}`}
            >
              <div
                className={`backdrop-glass ${useLight ? "backdrop-glass-lighter" : ""}`}
              />
              <div className="relative z-10 h-full w-full">{blocks}</div>
            </div>
          ) : (
            blocks
          );
        })()}
    </div>
  );
}
