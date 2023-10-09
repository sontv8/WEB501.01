import { router, useEffect, useState } from "../libs"
const ProductPage = () => {
    const [products, setProduct] = useState([])
    const [categories, setCategory] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => setProduct(data))

        fetch("http://localhost:3000/categories")
            .then((response) => response.json())
            .then((data) => setCategory(data))
    }, [])

    useEffect(() => {
        const categoryElementList = document.querySelectorAll(".category")
        for (let item of categoryElementList) {
            item.addEventListener("click", (e) => {
                e.preventDefault()
                let cateId = item.dataset.id
                fetch(`http://localhost:3000/products?categoryId=${cateId}`)
                    .then(response => response.json())
                    .then(data => setProduct(data))
            })
        }
    })


    return /*html*/`
        <div>
            <ul>
                ${categories.map((item) => {
        return `
                        <li><a href="" class="category" data-id="${item.id}">${item.name}</a></li>
                    `
    }).join("")}
            </ul>
            <div>
            ${products.map((product) => {
        return /*html*/`
            <img src="${product.image}" alt="" />
            <h3>${product.name}</h3>
            `
    }).join("")}
            </div>
                  
        </div>
    `
}

export default ProductPage