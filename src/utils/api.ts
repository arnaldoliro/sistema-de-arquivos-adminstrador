import Filters from '../types/Filters'


// Listar os Arquivos
export async function getFiles(filters: Filters & { page: number; limit?: number}) {
  const url = new URL("http://localhost:3000/files")

  if (filters.search?.trim()) {
    url.searchParams.append("search", filters.search.trim())
  }

  if (filters.category && filters.category !== "" && filters.category !== "Todas as categorias") {
    url.searchParams.append("category", filters.category)
  }

  if (filters.date && !isNaN(Date.parse(filters.date))) {
    url.searchParams.append("date", filters.date)
  }
  
  if (filters.page) {
    const skip = (filters.page - 1) * (filters.limit || 10)
    url.searchParams.append("skip", skip.toString())
  }
  
  url.searchParams.append("limit", (filters.limit || 10).toString())

  console.log("[getFiles] URL final:", url.toString())

  try {
    const res = await fetch(url.toString())
    if (!res.ok) throw new Error("contate a equipe de suporte")
    return await res.json()
  } catch (err) {
    console.error("[getFiles] Erro ao buscar arquivos:", err)
    throw err
  }
}

export async function fixFiles(id: number, isPinned: boolean) {
  const response = await fetch(`http://localhost:3000/files/${id}/fix`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isPinned }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao fixar');
  }

  return await response.json();
}