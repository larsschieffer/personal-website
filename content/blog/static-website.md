---
title: "Building & Hosting Your Static Website With Hugo & AWS"
date: 2024-05-27
summary:
  "Learn how to build, host, and deliver your static website using AWS
  efficiently and affordably. This guide will show you how to use Hugo for fast
  site generation, set up your project, style it with TailwindCSS, and automate
  your workflow. Avoid the limitations of free hosting services and gain full
  control over your content. Finally, deploy your site using AWS S3 for storage
  and CloudFront for global content delivery."
thumbnail: /blog/thumbnails/static-website.webp
---

In the last few years, hosting websites (at least static ones) has become really
easy. From [GitHub Pages](https://pages.github.com/) to
[Vercel](https://vercel.com/), hosting is now even free. However, recent
developments in free personal plans for web application technologies like
[Heroku](https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq)
or [PlanetScale](https://planetscale.com/blog/planetscale-forever) made me
rethink how to use these services. Personally, I don't like services where I'm
the product or worse, burning through VC capital. In the end, I either have to
pay or do the work again and switch to another free service. This post is about
how to build, host, and deliver your own static website worldwide really cheap.
I'm quite familiar with Amazon Web Services (AWS), so it made sense for me to
look for solutions in that space. But first, let's create the repository for the
static website.

## Preliminaries

### The Repository

We should always make sure to store our work in reasonable slices. To do that,
create a new repository with the version control platform of your choice (like
[GitHub](https://github.com/)).

### Accounts

You need an
[AWS account](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html).
You can even use [CodeCommit](https://aws.amazon.com/codecommit/) to handle your
source code.

### Tools

To follow this post, you need some tools installed. After installing them,
you're good to go.

- [Hugo](https://gohugo.io/installation/)
- [pnpm](https://pnpm.io/installation)
  - or [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)

## Generating

Building your own static website doesn't require any dependencies. You can write
the HTML and CSS files yourself, but you can use frameworks to support you. Now,
you have many frameworks to choose from, and you'll find many posts with various
opinions. Let me share why I pick [Hugo](https://gohugo.io/).

### Static Site Generator

There are several ways to build your website. You can create the HTML, CSS, and
JavaScript files by hand, use single-page application frameworks like Angular,
which rely heavily on JavaScript, improve content shifts with server-side
rendering, or generate the files during build time using static site generators.
So, what to pick?

#### Static or Dynamic

Luckily, there's no right or wrong answer if your site should be static or
dynamic. If your content changes a lot or your users can interact with your site
so that others can see it, you'll end up with a dynamic site with a backend &
database. But if you only want to display some content like this blog post,
consider serving the web page as static sites. The latter makes infrastructure
costs very cheap and facilitates the whole development process.

#### Own Your Content

Instead of writing your content directly in HTML,
[Angular templates](https://angular.dev/guide/templates), or
[JSX](https://react.dev/learn/writing-markup-with-jsx), you should use an
independent language like [Markdown](https://en.wikipedia.org/wiki/Markdown).
Using a different format for the content allows easy migration from one
framework to another. Furthermore, you can store the content part of the website
wherever you want. You don't buy into a proprietary format, which would be hard
to leave. JavaScript frameworks (with the help of
[markdown-it](https://www.npmjs.com/package/markdown-it)) as well Hugo can
render Markdown for static generated sites.

#### No JavaScript Needed

Previously, I used [Remix](https://remix.run/) to create this website. It worked
well, and I would still use it for dynamic client-side applications, but the
caveat was the maintenance of the dependencies. Yes, the culprit sat in front of
the computer, using too many libraries for too many things on the site, which
required time to be updated. Think about it, if you have some leisure time for
development, would you rather read about how to upgrade library XYZ or implement
a small neat tool that brings you joy?

#### Why Hugo

[Hugo](https://gohugo.io/) is a static site generator, written in Golang. This
results in very fast builds. If you're currently using a framework for your
static site and need to wait more than a few seconds to build it, give Hugo a
try; it will be worth it. In the end, the combination of less maintenance
effort, fast build times, and the plug-and-play Markdown renderer convinced me
to use Hugo as a static site renderer, and I'm really happy about it.

### Initialize the Project

Firstly, we need a working Hugo project. The generator differentiates between
content files and template files. Content files are written in Markdown, whereas
you can define the page layouts using Golang's templating engine and HTML. The
following will concentrate on quickly spinning up a Hugo site. For more details,
refer to Hugo's [documentation](https://gohugo.io/documentation/). Hugo uses a
particular kind of folder structure; you can easily create an empty project
(named my-blog) with the following command.

```sh
$ hugo new site my-blog
```

All new Hugo websites struggle with a chicken-and-egg problem. To generate the
single HTML webpages, both the layout and the content files are needed. After
changing your working directory into the project folder, first create the
Markdown file for the "/" (root) path at `./content/_index.md`.

```markdown
---
layout: single
---

# Welcome

Click [here](/hello) to see other content
```

A single HTML page is a bit dull, so create a second content file for the
"/hello" path at `./content/hello.md`.

```markdown
---
layout: single
---

# Other content

Go [back](/)
```

In addition to the content files, you need the necessary template files. They
contain the general structure of the page as HTML elements and set the location
where the Markdown content should be rendered. As mentioned earlier, Hugo is
written in Golang, so it uses its templating engine to generate the HTML files.
Using the right template structure in Hugo can save you a lot of time and
trouble, so reading
"[Introduction into templating](https://gohugo.io/templates/introduction/)" is a
good start to go deeper into Hugo's ecosystem. For this simple example, we need
two layout files to render the content files above. Create a template file to
handle the base layout at `./layouts/_default/baseof.html`. The file contains
the overall structure of every page that will be generated. It's like a wrapper
around every rendered content. Therefore, it makes sense to define the standard
HTML structure as you know it.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>{{ .Site.Title }}</title>
  </head>
  <body>
    {{ block "content" . }} {{ end }}
  </body>
</html>
```

`{{ block "content" . }} {{ end }}` allows the use of this base structure for
every layout used in your website. The syntax originates from Golang's
templating engine and means that at this location, it is expected that some
other file defines the block "content". And here lies the beauty of it: you can
define this block to display a single site (as defined in the content above) or
other layouts as you like. For simplicity in this example, you only need to
define the single layout at `./layouts/_default/single.html`, which only renders
the provided Markdown in `.Content` without further HTML elements.

```html
{{ define "content" }} {{ .Content }} {{ end }}
```

Now, you can test if the initialization of the project works. Run `hugo server`
to start a development server for your Hugo projects at `localhost:1313`. You
can find both content files served at `localhost:1313/` and
`localhost:1313/hello`.

This concludes the first section, so it makes sense to commit your changes with
the message "Initialize Hugo project."

### Add Styling

Until now, you've shown plain HTML files. To make them more appealing, you can
use CSS or even SCSS. CSS frameworks like TailwindCSS require a bit more effort
initially, but it's worth it because of the better developer experience.
TailwindCSS is available as a npm package, so first, you need a `package.json`
file. Run `pnpm init` to create a fresh one. Then, install TailwindCSS as
described in their
[documentation](https://tailwindcss.com/docs/installation/using-postcss). Since
the project contains only Markdown and HTML files, you should update the
`content` attribute in `tailwind.config.js` to the following:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

The next step is to add Tailwind's directives in the file
`./assets/css/main.css`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

The file above is not valid CSS. It first has to be generated into valid CSS
with the help of TailwindCSS itself. The following command reads the directives
from the `main.css` file, finds out which Tailwind classes are used in the
content and template files of the project, and generates the final CSS in
`./assets/css/style.css`.

```sh
$ pnpx tailwindcss -i ./assets/css/main.css -o ./assets/css/style.css
```

The generated file can now be referenced in the `<head>` section of the
`baseof.html` template file. (Code originated from
[Hugo Tailwind Starter](https://github.com/4044ever/Hugo-Tailwind-3.2/blob/main/layouts/partials/head.html))

<!-- prettier-ignore-start -->
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />

    {{ $styles := resources.Get "/css/style.css" }}
    {{ if .hugo.IsServer }}
      <link rel="stylesheet" href="{{ $styles.RelPermalink }}" />
    {{ else }}
      {{ $styles := $styles | minify }}
      <link rel="stylesheet" href="{{ $styles.RelPermalink }}" />
    {{ end }}

    <title>{{ .Site.Title }}</title>
  </head>
  <body class="h-full w-full bg-orange-300 [&_a]:text-orange-700 [&_h1]:text-3xl">
    {{ block "content" . }} {{ end }}
  </body>
</html>
```
<!-- prettier-ignore-end -->

Again, you should check if everything works correctly. Run the following two
commands to regenerate the CSS file and start your development server. Instead
of a plain HTML website as in the previous test, you should now see a colored
background and colored links.

```sh
$ pnpx tailwindcss -i ./assets/css/main.css -o ./assets/css/style.css
$ hugo server
```

This concludes the styling section, so please commit your changes with the
message "Add TailwindCSS to project".

### Add Scripts

Running the previous two commands repeatedly whenever you change something on
the website would be very tedious. Therefore, the following scripts will help
automate the development and build process. First, install the following package
to allow scripts to run concurrently with `pnpm install -D concurrently`. Then,
update the `package.json` script attribute as follows.

```json
...
  "scripts": {
    "start:css": "pnpx tailwindcss -i ./assets/css/main.css -o ./assets/css/style.css -w",
    "start:hugo": "hugo server",
    "start": "concurrently --kill-others \"pnpm run start:css\" \"pnpm run start:hugo\"",
    "build:css": "pnpx tailwindcss -i ./assets/css/main.css -o ./assets/css/style.css -m",
    "build:hugo": "hugo --minify",
    "build": "pnpm run build:css && pnpm run build:hugo"
  }
...
```

You can use `pnpm run start` now during development. Tailwind watches for
changes to regenerate the `style.css` file, and concurrently, the Hugo web
server is started to update content and layout changes.

You did it! You've concluded the website generation part. Please commit your
changes with the message "Add build scripts". If you’ve never worked with Hugo
before, I highly recommend the
[getting started](https://gohugo.io/getting-started/) guides from Hugo to start
your journey. But first, let's look at how to bring the website to your users.

## Hosting

The next step is to bring the website from your computer to a server so that
users can access it 24/7. Create the production build with `pnpm run build`.
You’ll find the generated site in the folder `./public`. To simplify the
infrastructure, you will use AWS S3 object storage service to store your site in
the cloud. Your files are stored in buckets, which can be located around the
world. Even though AWS offers
[hosting a static website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
for your S3 files, you won't be using it. Therefore, for your users, it doesn't
matter where your files are located, and you can choose a location next to you.
I live in Germany, so I select `eu-central-1` as the location and
`my-blog-12345` as the name for my bucket. If you get any errors, it is probable
that the name is already in use.

```sh
$ aws s3 mb --region eu-central-1 s3://my-blog-12345
```

Finally, you can upload the created files in `./public` to your bucket.

```sh
$ aws s3 sync ./public s3://my-blog-12345
```

The files aren't accessible except by you. Let's allow your users to view your
site.

## Content Delivery

Your bucket is located in a single region, but your users may access your site
from different parts of the world. To provide a consistent user experience
globally, you can use CloudFront's regional edge caches. Let's start by creating
a new CloudFront distribution. The origin should be your created S3 bucket, like
in this case `my-blog-12345.s3.amazonaws.com`.

```sh
$ aws cloudfront create-distribution \
    --origin-domain-name my-blog-12345.s3.amazonaws.com \
    --default-root-object index.html
```

Initially, only you have access to the AWS bucket, and even CloudFront cannot
read something from your bucket. You need to change this by following the AWS
tutorial on
"[Creating a new origin access control](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#create-oac-overview-s3)".

To verify the changes, you can get the current deployment with the following
command and look for the `DomainName` key with a value in the format
"xxxxxxxxx.cloudfront.net".

```sh
$ aws cloudfront get-distribution --id <CloudFront distribution ID>
```

You should see the content of the "root" path from the static website. However,
clicking on the link to "/hello" won't work because "/hello" is not a valid file
in the S3 bucket. The valid path would be "/hello/index.html". AWS provides a
solution to append `index.html` if necessary for your users with the following
function:

```javascript
async function handler(event) {
  const request = event.request;
  const uri = request.uri;

  // Check whether the URI is missing a file name.
  if (uri.endsWith("/")) {
    request.uri += "index.html";
  }
  // Check whether the URI is missing a file extension.
  else if (!uri.includes(".")) {
    request.uri += "/index.html";
  }

  return request;
}
```

The following three steps are required to ensure the function is executed at
every edge location:

1. [Create](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/create-function.html)
   the edge function.
2. [Publish](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/publish-function.html)
   the function from development.
3. [Associate](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/associate-function.html)
   the function to your distribution.

Afterward, you can use the same URL from above to test if your changes worked.
You should now access both paths on the CloudFront domain as expected.

## Custom Domain

Your website can now be accessed by users globally. However,
`xxxxxxx.cloudfront.net` is not ideal for your web presence. The final step is
to connect your custom domain with the created CloudFront distribution. This can
be done with Route 53 and is described in the guide
"[Routing traffic to an Amazon CloudFront distribution by using your domain name](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html)".

## Further Steps

Your website is up and running, and users are accessing it, but there are a few
more things to do to refine it further:

- **Continuous Delivery**:

  - The provided scripts are intended for use in a CI/CD setting, so you don't
    have to manually upload to S3.
  - If you are using GitHub, you can check out this
    [workflow](https://github.com/larsschieffer/personal-website/blob/main/.github/workflows/publish.yml).

- **Page Redirects**:

  - Add
    [page redirects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-page-redirect.html)
    to redirect `www.example.com` to `example.com` or vice versa.

- **Custom Error Responses**:
  - Add
    [custom error responses](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GeneratingCustomErrorResponses.html)
    to handle errors more gracefully.
