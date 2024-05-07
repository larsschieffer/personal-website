---
title: My Personal Website's Architecture
published: 2023-05-28
summary:
  How did I build this website? How much does it cost? A quick overview of the
  benefits and drawbacks of the chosen architecture.
thumbnail: /blog/thumbnails/website-architecture.webp
---

Foremost, my goal for this website is to have an aggregation of my learnings so
that I can easily collect and share them. Furthermore, I want to create a place
to show smaller projects of my own. Therefore, my assumptions for the website
are:

- very little traffic
- no continuous development for the website itself
- I’m the only Software Developer on this project
- should not be too expensive

## Architecture

The following sections contain the decisions I made to get the best experiences
for the users visiting the site and myself during the development. Have fun
reading it!

### Application

In many projects, the software developers are split into frontend- and
backend-developers. For this website, this is not the case because I can
leverage my knowledge as fullstack-developer. To minimize the complexity, I
decided to go with the same programming language for the complete application.
After some research, I was sold by the motivation behind the meta framework
[remix](https://remix.run/). The largest benefits for me are the type-safety
over the network border and the support for good decision-making by the
framework itself. The latter is significant to me because I don’t have a second
pair of eyes for code reviews or pair programming.

### Database

Currently, all content for the website originated by me. Therefore, strictly
speaking, a database is not needed at the moment. But I have some really nice
features planned in the future so that I build an architecture which already
supports a database connection. I doubt that the website has to handle millions
of database queries so that I went with a plain, simple
[PostgreSQL](https://www.postgresql.org/) database. To access the database from
the web server, I chose [Prisma](https://www.prisma.io/) as
[ORM](https://www.baeldung.com/cs/object-relational-mapping). The combination of
Prisma, Remix and Typescript is a match made in heaven. I love the type safety
from the database, over my node backend to the frontend application. No more
hours of fixing a bug due to a spelling mistake in my Typescript models.

### Content

I would rather not rebuild the whole application, only to correct a spelling
mistake in a blog post. Therefore, I manage the content and the application
itself separately. This allows me to reuse the content if I’m changing the
architecture of this website, and perhaps deliver the content in multiple
languages if it is required in the future. In the end, I found the
[mdx-bundler](https://www.baeldung.com/cs/object-relational-mapping) package,
which allows me to store the content of the site in a different
[content-repository](https://github.com/larsschieffer/personal-website-posts).

### Domain

Changing your domain registrar is not the best activity to spend your leisure
time with. Therefore, years ago I went with
[Route53](https://aws.amazon.com/route53/), which is an AWS Service. Due to my
background, I’m quite familiar with AWS, and so I like the simplicity to easily
change my domain records and have new applications easily deployed.

### Serverless Function

The entire application runs on serverless functions. Due to the fact, that only
a very few people access the site, it makes sense to not always run the node
server. Yes, this comes with the drawback that some people experience a longer
wait time to retrieve the initial load, but it is much cheaper than always
running a server nobody is actively using.

### Assets

Serverless functions come with some limitations. In general, they have
limitations on memory, execution time and storage. Therefore, I’m hosting all
the static assets for the web application on a
[S3 Bucket](https://aws.amazon.com/s3/) with a
[CloudFront CDN](https://aws.amazon.com/cloudfront/) to reduce the time to
deliver the assets.

### Hosting

At the beginning, I wanted to host everything on AWS. But running a database on
AWS costs some money, even though it is not used very frequently. After some
research, I read a lot about [Vercel](https://vercel.com/). Vercel delivers a
really nice developer experience without the pain to getting everything
configured manually. For small projects like this, the
”[hobby pricing](https://vercel.com/pricing)” is precisely what I need. But you
have to keep in mind, the free tier contains only 60 hours for the PostgreSQL
database each month. Thereafter, you have to pay. However, for me, this
limitation works because the little traffic of my site doesn’t need a 24/7
access to a running database.

### Deployment

As mentioned in my [introduction](/blog/posts/about-me), I hate nothing more
than doing the same things over and over again. With that said, the build and
deployment process is completely automated. As soon as I make a commit to the
main branch, my GitHub actions start running. They run type checks and linting
rules, followed by the build step. Afterwards, the artefacts are pushed to
Vercel.

## Design

I know my limitations, and I know that I’m no web design expert. But I’m a
software developer who can implement an existing design if it is provided to me.
Therefore, I went shopping for a nice design for my personal website. In the
end, I found a
[design](https://themeforest.net/item/vcard-resume-cv-portfolio/26325223) I
really liked, such that I bought it right away.

## Price

Now, the interesting part is how much I have to pay for all the services to keep
the website running. The following table shows the price for each item.

| Item               | Monthly Price | Yearly Price |
| :----------------- | :-----------: | -----------: |
| Domain Registrar   |               |        $9.00 |
| Hosted Zone        |     $0.50     |              |
| Assets             |     $0.00     |              |
| Content Management |     $0.00     |              |
| CI/CD              |     $0.00     |              |
| Backend Hosting    |     $0.00     |              |
| Database Hosting   |     $0.00     |              |

Yes, you read the table right. All the services cost me $15 a year (without
taxes), plus additionally the costs for the theme I bought. If you can make the
same assumptions as I did, the presented architecture and service could be right
for you, too.
