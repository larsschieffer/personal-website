import type { BlogImageProps } from "~/types/blog";

export const BlogImage = ({ src, alt }: BlogImageProps): JSX.Element => {
  return <img src={src} alt={alt} className="object-fit w-full" />;
};

export default BlogImage;
