import React from "react";
import { getExternalImage } from "./imageRegistry";

export interface SmartImageProps {
  src: string;
  alt: string;

  /* comunes */
  className?: string;
  priority?: boolean;
  sizes?: string;

  /* layout */
  width?: number;
  height?: number;
  fill?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = (props) => {
  const ExternalImage = getExternalImage();

  if (ExternalImage) {
    return <ExternalImage {...props} />;
  }

  const { fill, ...rest } = props;

  return <img {...rest} loading="lazy" />;
};
