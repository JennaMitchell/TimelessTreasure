import { useEffect, useState } from "react";
import classes from "./spinner.module.scss";
interface Props {
  parentButtonId: string;
  initialRender: boolean;
}
const Spinner = ({ parentButtonId, initialRender }: Props) => {
  const [allCirclesActive, setAllCirclesActive] = useState(false);
  const [activeCircleNumber, setActiveCircleNumber] = useState(0);
  const numberOfCircles = 8;

  useEffect(() => {
    if (initialRender) {
      setTimeout(() => {
        let xOffset = 0;
        let yOffset = 0;
        let circleDiameterPixels = 0;

        const parentElement = document.getElementById(
          `${parentButtonId}`
        ) as HTMLElement;

        if (parentElement) {
          const parentElementsComputedStyles =
            window.getComputedStyle(parentElement);

          const widthPIndex = parentElementsComputedStyles.width
            .split("")
            .indexOf("p");

          const width = +parentElementsComputedStyles.width
            .split("")
            .slice(0, widthPIndex)
            .join("");

          const heightPIndex = parentElementsComputedStyles.height
            .split("")
            .indexOf("p");
          const height = +parentElementsComputedStyles.height
            .split("")
            .slice(0, heightPIndex)
            .join("");

          xOffset = width;
          xOffset = xOffset / 2 - 2;

          yOffset = +height;
          yOffset = yOffset / 2 - 2;

          if (xOffset < yOffset) {
            circleDiameterPixels = xOffset;
          } else {
            circleDiameterPixels = yOffset;
          }
          const angleIncrement = Math.round(360 / numberOfCircles);
          const circleRadius = circleDiameterPixels / 2;
          const activeCircle = document.getElementById(
            `circle-${activeCircleNumber}`
          );
          const radians = angleIncrement * 0.0174533 * activeCircleNumber;
          if (xOffset < 0) {
            xOffset = 0;
          }

          let dotXPosition = Math.round(
            xOffset + circleRadius * Math.cos(radians)
          );
          let dotYPosition = Math.round(
            yOffset + circleRadius * Math.sin(radians)
          );

          if (!allCirclesActive && activeCircle != null) {
            activeCircle.style.top = `${dotYPosition}px`;
            activeCircle.style.left = `${dotXPosition}px`;
          }

          if (!allCirclesActive && activeCircle != null) {
            activeCircle.style.opacity = "1";
          } else if (activeCircle != null) {
            activeCircle.style.opacity = "0";
          }

          let tempNumber = activeCircleNumber + 1;

          if (activeCircleNumber === numberOfCircles - 1) {
            setActiveCircleNumber(0);
            setAllCirclesActive(!allCirclesActive);
          } else {
            setActiveCircleNumber(tempNumber);
          }
        }
      }, 500);
    }

    //   return clearTimeout(timeout);
  }, [allCirclesActive, activeCircleNumber, initialRender, parentButtonId]);

  return (
    <>
      <div className={classes.loadingCircle} id={`circle-0`} />
      <div
        className={classes.loadingCircle}
        key={`loading-circle-1`}
        id={`circle-1`}
      />
      <div className={classes.loadingCircle} id={`circle-2`} />
      <div className={classes.loadingCircle} id={`circle-3`} />
      <div className={classes.loadingCircle} id={`circle-4`} />
      <div className={classes.loadingCircle} id={`circle-5`} />
      <div className={classes.loadingCircle} id={`circle-6`} />
      <div className={classes.loadingCircle} id={`circle-7`} />
    </>
  );
};
export default Spinner;
