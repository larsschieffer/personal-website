import { CgNotes } from "@react-icons/all-files/cg/CgNotes";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { getDay, getMonth } from "~/services/date";
import type { BlogPostThumbnailProps } from "~/types/blog";

export const BlogPostThumbnail = ({
  slug,
  frontMatter: { title, description, thumbnail, published },
}: BlogPostThumbnailProps): JSX.Element => {
  const [isHoverOnThumbnail, setHoverOnThumbnail] = useState(false);
  const [hasImageError, setImageError] = useState(!thumbnail);
  const intl = useIntl();
  const publishedDate = new Date(published);

  return (
    <Link
      to={`/blog/posts/${slug}`}
      className="overflow-hidden rounded-4xl"
      onMouseEnter={(): void => setHoverOnThumbnail(true)}
      onMouseLeave={(): void => setHoverOnThumbnail(false)}
    >
      <div className="relative">
        {hasImageError ? (
          <div
            className="h-60 max-h-60 w-full bg-blue-300"
            style={{
              background:
                "linear-gradient(55deg, hsla(197, 84%, 35%, 1) 0%, hsla(181, 99%, 37%, 1) 60%)",
            }}
          ></div>
        ) : (
          <img
            className="h-60 max-h-60 w-full object-cover"
            src={thumbnail}
            alt={`${intl.formatMessage({
              id: "blog.thumbnailLabel",
            })} ${title}`}
            onError={(): void => {
              setImageError(true);
            }}
          />
        )}
        {isHoverOnThumbnail ? (
          <div className="absolute inset-0 grid place-content-center bg-gray-dark/20">
            <CgNotes className="text-4xl text-white"></CgNotes>
          </div>
        ) : null}
        <div className="absolute left-0 top-0 flex h-16 w-16 flex-col items-center justify-center rounded-br-3xl bg-accent-secondary text-white">
          <span className="text-2xl font-semibold">
            {getDay(intl.locale, publishedDate)}
          </span>
          <span className="text-sm">
            {getMonth(intl.locale, publishedDate)}
          </span>
        </div>
      </div>
      <div className="h-full bg-gray-light p-6 pt-3">
        <h3 className="truncate py-2 text-lg font-bold capitalize">{title}</h3>
        <p className="line-clamp-2 text-ellipsis">{description}</p>
      </div>
    </Link>
  );
};

export default BlogPostThumbnail;
