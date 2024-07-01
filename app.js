const API_KEY= '0NzIU9h1FiQYX8Jch6YETio1JrAb0vd5'
const searchForm = document.querySelector('#searchForm')
const searchInput = document.querySelector('#searchInput')
const gifContainer = document.querySelector('#gifContainer')
const clearButton = document.querySelector('#clearButton')
console.log("Let's get this party started!");
async function getGif(apiKey, query) {
  const url = 'https://api.giphy.com/v1/gifs/search'
  const params = {
    api_key: apiKey,
    q: query,
    limit: 1,
  }
  try {
    const res = await axios.get(url, {params})
    if (res.status === 200 && res.data.data.length > 0){
      console.log(res.data.data);
      console.log(res.data.data[0].images.downsized.url);
      return (res.data.data[0].images.downsized.url)
    } else {
      console.error(`Error: ${res.status}`)
      return null
    }
  } catch(error){
    console.error(`Error fetching GIFS: ${error}`)
    return null
  }
}

searchForm.addEventListener('submit', async function(e){
  e.preventDefault()
  const q = searchInput.value
  if (q.trim() !== ''){
    const gifUrl = await getGif(API_KEY,q)
    console.log(gifUrl);
    if(gifUrl){
      appendGifToPage(gifUrl)
    }
    searchInput = ''
  }
})

function clearGifContainer() {
  gifContainer.innerHTML = ''
}

clearButton.addEventListener('click', clearGifContainer)

function appendGifToPage(gifUrl){
  const img = document.createElement('img')
  img.src = gifUrl
  gifContainer.appendChild(img)
}


