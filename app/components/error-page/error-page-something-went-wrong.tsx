import { ErrorPage } from "./error-page";

export const ErrorPageNotFound = (): JSX.Element => {
  return (
    <ErrorPage
      imageAltTextId="error.404.imageDescription"
      imagePath="404.svg"
      descriptionTextId="error.404.message"
      buttonTextId="error.404.button"
    ></ErrorPage>
  );
};
