export const loader = (): Response => {
  const robotText = `User-agent: *
Disallow:
Sitemap: https://lars.schieffer.cloud/sitemap.xml`;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
