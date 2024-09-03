export function getArticle(slug) {
    return fetch(`https://blog.kata.academy/api/articles/${slug}`)
        .then(response => response.json())
}