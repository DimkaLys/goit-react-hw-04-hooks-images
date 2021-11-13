const base_url = `https://pixabay.com/api/`;
const api_key = `23250095-f2af5bd72bd110fab39dfaa61`;

export default async function fetchImages(value, page) {
  // console.log('page in API:', page);
  let url = `${base_url}?q=${value}&page=${page}&key=${api_key}&image_type=photo&orientation=horizontal&per_page=12`;
  try {
    const r = await fetch(url);
    const data = await r.json();
    return data.hits;
  } catch (err) {
    return err.message;
  }
}
