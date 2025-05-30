export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({
      data: [
        {
          id: 1,
          name: "React",
          slug: "react",
          _count: { posts: 0 },
        },
        {
          id: 2,
          name: "JavaScript",
          slug: "javascript",
          _count: { posts: 0 },
        },
      ],
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
