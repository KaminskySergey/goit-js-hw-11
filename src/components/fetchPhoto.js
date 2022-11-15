export async function fetchPhoto(name, page){
    const response = await fetch(`https://pixabay.com/api/?key=31274653-67696640fdcd1e011de901f6c&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    const image =  response.json();
    return image;
    
}
