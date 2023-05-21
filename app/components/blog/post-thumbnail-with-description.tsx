import { useState } from "react";
import { useIntl } from "react-intl";
import type { BlogFrontmatter } from "~/types/blog/blog-frontmatter";
import { getDay, getMonth } from "~/utils/date";

import { CgNotes } from "@react-icons/all-files/cg/CgNotes";
import { Link } from "@remix-run/react";

export function PostThumbnailWithDescription({
  slug,
  frontMatter: { title, description, thumbnail, published },
}: {
  slug: string;
  frontMatter: BlogFrontmatter;
}) {
  const [isHoverOnThumbnail, setHoverOnThumbnail] = useState(false);
  const intl = useIntl();
  const publishedDate = new Date(published);

  return (
    <Link
      to={`/blog/posts/${slug}`}
      className="overflow-hidden rounded-4xl"
      onMouseEnter={() => setHoverOnThumbnail(true)}
      onMouseLeave={() => setHoverOnThumbnail(false)}
    >
      <div className="relative">
        <img
          className="max-h-60 w-full object-cover"
          src={thumbnail}
          alt={`${intl.formatMessage({
            id: "blog.thumbnailLabel",
          })} ${title}`}
        />
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
      <div className="bg-gray-light p-6 pt-3">
        <h4 className="py-2 text-lg font-bold">{title}</h4>
        <p className="line-clamp-2 text-ellipsis">{description}</p>
      </div>
    </Link>
  );
}
