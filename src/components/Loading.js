import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/list";
import { useMediaQuery } from "react-responsive";

// The component for the Lottie spinner.
export const Loading = () => {
  const isMobile = useMediaQuery({ query: "(max-width:667px)" });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {isMobile && <Lottie options={defaultOptions} height={300} width={300} />}
      {!isMobile && (
        <Lottie options={defaultOptions} height={600} width={600} />
      )}
    </>
  );
};
