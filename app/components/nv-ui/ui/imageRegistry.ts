import React from "react";

export type ImageComponentType = React.ComponentType<any>;

let ExternalImage: ImageComponentType | null = null;

export const setExternalImage = (Component: ImageComponentType) => {
  ExternalImage = Component;
};

export const getExternalImage = () => ExternalImage;
