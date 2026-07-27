export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const upstreamBaseUrl = "https://fantasy.premierleague.com";

const buildUpstreamUrl = (pathname: string, search: string) => {
  const trimmedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${upstreamBaseUrl}${trimmedPath}${search}`;
};

const proxyRequest = async (request: Request, params: { path: string[] }) => {
  const url = new URL(request.url);
  const upstreamUrl = buildUpstreamUrl(`/${params.path.join("/")}`, url.search);

  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers: {
      accept: request.headers.get("accept") ?? "application/json",
      "user-agent": request.headers.get("user-agent") ?? "TurboFPL",
    },
    cache: "no-store",
  });

  const body = await upstreamResponse.text();
  const headers = new Headers();
  const contentType = upstreamResponse.headers.get("content-type");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  return new Response(body, {
    status: upstreamResponse.status,
    headers,
  });
};

export async function GET(
  request: Request,
  context: { params: { path: string[] } },
) {
  return proxyRequest(request, context.params);
}
