export function fetchPhoto(name, page){
    return fetch(`https://pixabay.com/api/?key=31274653-67696640fdcd1e011de901f6c&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    .then(response => response.json())
    
    
}
