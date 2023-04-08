export async function fetchGetJSON(url: string) {
  console.log(url);
  
  try {
    const data = await fetch(url, { cache: 'no-cache', }).then((res) => res.json())
    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw err
  }
}

export async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data || {}),
    })
    return await response.json()
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw err
  }
}
