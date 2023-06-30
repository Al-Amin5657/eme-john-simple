import { getShoppingCart } from "../utilities/fakedb";

const CartProductsLoader = async () => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    console.log(ids);
    const loadedProducts = await fetch(`http://localhost:5000/productsById`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    const products = await loadedProducts.json()
    console.log(products);
    // If cart data is in database, You have to use async await



    const savedCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    // if you need to send to two thing
    // return [products, savedCart]
    // return {products, cart: savedCart}
    return savedCart;

}

export default CartProductsLoader;