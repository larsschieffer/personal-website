import { ErrorPage } from "./error-page";

export const ErrorPageDefault = (): JSX.Element => {
  return (
    <ErrorPage
      imageAltTextId="error.default.imageDescription"
      imagePath="error.svg"
      descriptionTextId="error.default.message"
      buttonTextId="error.default.button"
    ></ErrorPage>
  );
};
