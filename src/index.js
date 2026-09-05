/**
 * Cloudflare Workers entry point for Advance Uploader Bot
 * 
 * For Python backend, configure environment variables:
 * - PYTHON_SERVER_URL: Your Python app URL (e.g., via Railway, Render)
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pythonServerUrl = env.PYTHON_SERVER_URL;

    if (!pythonServerUrl) {
      return new Response('PYTHON_SERVER_URL environment variable not set', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Proxy all requests to your Python backend
    const targetUrl = new URL(url.pathname + url.search, pythonServerUrl);
    
    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    } catch (error) {
      return new Response(`Error proxying request: ${error.message}`, {
        status: 502,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
