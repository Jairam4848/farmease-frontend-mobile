const memoryStore = new Map<string, string>();

export async function getSecureItem(key: string) {
  return memoryStore.get(key) ?? null;
}

export async function removeSecureItem(key: string) {
  memoryStore.delete(key);
}

export async function setSecureItem(key: string, value: string) {
  memoryStore.set(key, value);
}
