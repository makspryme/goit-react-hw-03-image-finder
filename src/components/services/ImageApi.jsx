export default function ImageApi(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=36746776-e64b35908dc0b8143507a4db3&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Not Found Images by ${name}`));
  });
}
