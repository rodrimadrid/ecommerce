export const fetchData = async () => {
    let response = await getProducts();
    let json = await response.json();
    return json;
}

const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch('/products.json'))
        }, 2000);
    })
}
