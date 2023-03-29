export const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '9f509daa2ff1982accf720f11de81a4d',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}
