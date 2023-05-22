import { getShoppingCart } from "../utilities/fakedb";

const CartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json()
    // If cart data is in database, You have to use async await
    const storedCart = getShoppingCart();
    console.log(storedCart);
    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id);
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