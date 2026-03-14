interface CustomRequestContext {
  request: {
    method: string;
    url: string;
    headers?: Headers;
  };
}

interface CustomAfterHandlerContext {
  request: {
    method: string;
    url: string;
    headers?: Headers;
  };
  response?: {
    status?: number;
    code?: number;
    headers?: Headers;
  };
}
