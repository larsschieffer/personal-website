export const loader = (): Response => {
  const robotText = `User-agent: *
Disallow:
Sitemap: https://larsschieffer.de/sitemap.xml`;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
