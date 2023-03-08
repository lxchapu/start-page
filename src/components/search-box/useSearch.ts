function useSearch() {
  function searchInBing(keyword: string) {
    keyword = keyword.trim()
    if (keyword.length) {
      const url = `https://www.bing.com/search?q=${encodeURI(keyword)}`

      window.open(url, '_self')
    }
  }

  return { searchInBing }
}

export default useSearch
