export const apiClient = {
  async get<T>(_path: string): Promise<T> {
    throw new Error("apiClient.get is not implemented yet.");
  },
  async post<T>(_path: string, _body?: unknown): Promise<T> {
    throw new Error("apiClient.post is not implemented yet.");
  },
};
