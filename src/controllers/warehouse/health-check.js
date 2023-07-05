export default async function healthz() {
  const body = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    statusCode: 200,
  };
}
