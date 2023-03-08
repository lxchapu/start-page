import jsonp from 'jsonp'
import { isArray } from 'lodash-es'
import { ref } from 'vue'

const SEARCH_HISTORY_KEY = 'search-history'

type SuggestionType = 'suggestion' | 'history'

function useFetchSuggestions() {
  const suggestions = ref<{ type: SuggestionType; value: string }[]>([])

  function fetchBingSuggestions(keyword: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      jsonp(`https://api.bing.com/qsonhs.aspx?type=cb&q=${keyword}`, { param: 'cb', timeout: 10000 }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          const list: string[] = []
          data.AS.Results.forEach((res: any) => {
            res.Suggests.forEach((item: any) => {
              list.push(item.Txt)
            })
          })

          resolve(list)
        }
      })
    })
  }

  function loadLocalSuggestions() {
    const item = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (item) {
      try {
        const res = JSON.parse(item)
        if (isArray(res)) {
          return res
        } else {
          return []
        }
      } catch {
        return []
      }
    } else {
      return []
    }
  }

  function fetchLocalSuggestions(keyword: string) {
    const list = loadLocalSuggestions()
    return list.filter((item: string) => {
      return item.indexOf(keyword) !== -1
    })
  }

  async function fetchData(keyword: string) {
    keyword = keyword.trim()

    const list: { type: SuggestionType; value: string }[] = []
    const local = fetchLocalSuggestions(keyword)
    local.forEach((item) => {
      list.push({ type: 'history', value: item })
    })
    if (keyword) {
      const bing = await fetchBingSuggestions(keyword)
      bing.forEach((item) => {
        list.push({ type: 'suggestion', value: item })
      })
    }
    console.log(list)

    suggestions.value = list
  }

  return {
    fetchData,
    suggestions,
  }
}

export default useFetchSuggestions
