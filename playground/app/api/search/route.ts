export const dynamic = 'force-static';

export function GET() {
  return new Response('Search disabled', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' },
  });
}
