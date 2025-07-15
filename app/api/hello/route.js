// app/api/hello/route.js
export async function GET(request) {
  return Response.json({ name: "John Doe" })
}