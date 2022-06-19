export default class apiServise {
  constructor() {
    this.dataUser = '';
    this.page = 1;
  }
}

async getData() {
  const url = `https://pixabay.com/api/?key=28142937-a3dfb3cd180998f959efa9eff&q=${dataUser}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  try {
    const response = await axios.get(url);
    return response.data.hits;
    // renderList(dataImages);
  } catch (error) {
    console.error(error);
  }
}
