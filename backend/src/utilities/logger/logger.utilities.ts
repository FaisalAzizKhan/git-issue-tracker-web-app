export const logger = () => {
  const logs = new Map<string, string>();

  return (app: any) =>
    app
      .onRequest(({ request }: CustomRequestContext) => {
        const now = new Date();
        const time = now.toISOString().replace("T", " ").slice(0, 19);
        logs.set(request.url, time);
      })
      .onAfterHandle(({ request, response }: CustomAfterHandlerContext) => {
        const time = logs.get(request.url) || "N/A";
        const method = request.method;
        const url = request.url;
        const status = response?.code || 200;
        console.log("[" + time + "] " + method + " " + url + " - " + status);
        logs.delete(url);
      });
};
