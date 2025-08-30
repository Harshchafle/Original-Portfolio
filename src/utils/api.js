export async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function getAllPages(url, perPage = 100, maxPages = 10) {
  let page = 1;
  const all = [];
  while (page <= maxPages) {
    const res = await fetch(`${url}?per_page=${perPage}&page=${page}`, { 
      headers: { 'Accept': 'application/vnd.github+json' } 
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const chunk = await res.json();
    all.push(...chunk);
    if (!Array.isArray(chunk) || chunk.length < perPage) break;
    page++;
  }
  return all;
}
