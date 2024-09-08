export async function GET() {
  const clientId = process.env.IGDB_CLIENT_ID;
  const accessToken = process.env.IGDB_ACCESS_TOKEN;
  const corsProxyUrl = process.env.CORS_PROXY_URL;

  if (!clientId || !accessToken || !corsProxyUrl) {
    return new Response(
      JSON.stringify({ error: "Missing required environment variables." }),
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${corsProxyUrl}/https://api.igdb.com/v4/games`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
        body: "fields id, name, cover.url; limit 10;", // Adjust query as needed
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data from IGDB API:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data." }), {
      status: 500,
    });
  }
}
