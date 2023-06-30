import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const { totalProducts } = useLoaderData();
    // const itemsPerPage = 10; // todo: make it dynamic
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const pageNumbers = [...Array(totalPages).keys()]
    console.log(totalProducts);
    // const pageNumbers = [];
    // for(let i = 1; i <= totalPages; i++){
    //     pageNumbers.push(i);
    // }

    /* 
    1. done. determine the total number of items
    2. todo: decide on the number of item per page.
    3. done: calculate the total number of pages
    4. done: Determine the current page
     */

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&lilit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage])

    // fetch(`http://localhost:5000/products?page=${currentPage}&lilit=${itemsPerPage}`)

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart()
    }

    const options = [5, 10, 20];
    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch(`http://localhost:5000/productsById`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProduct => {
                const savedCart = [];
                //  step-1: get id
                for (const id in storedCart) {
                    // step-2: get the product by using id
                    const addedProduct = cartProduct.find(product => product._id === id);

                    // step-3: get quantity of the product
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        // step4: add the added product to the save cart
                        savedCart.push(addedProduct)
                    }
                    console.log('added Product:', addedProduct);
                }
                // step-5: set the cart
                setCart(savedCart);
            })



    }, [products])

    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];

        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update the quantity by 1
        const exists = cart.find(pd => pd._id === product._id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart)
        addToDb(product._id)
    }

    return (
        <>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className='cart-container'>
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed' to="/orders">
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div >
            {/* pagination */}
            <div className="pagination">
                <p>current page: {currentPage} and items per page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;