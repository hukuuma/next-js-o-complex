'use-client'
import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../buttons/primary-button';
import styles from './styles.module.css';

function dispatchUpdateCartEvent () {
    document.dispatchEvent (
        new CustomEvent('cart_update')
    )
}

export default function ProductsCard({ data }: any) {
    const [inCart, setInCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartCleared, setCartCleared] = useState(true);

    const buy = () => {
        const cart = window.localStorage.getItem('cart');
        const product = {
            id: data.id,
            quantity: 1, 
            name: data.title, 
            price: data.price
        };
        let newCart = [];

        if(cart) {
            newCart = JSON.parse(cart!);
        }

        newCart.push(product)
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        setInCart(true);
        dispatchUpdateCartEvent();
    }

    const increase = () => {
        const cart = window.localStorage.getItem('cart');
        if(cart) {
            const newCart = JSON.parse(cart!);
            newCart.forEach((element: any) => {
                if(element.id === data.id) {
                    element.quantity += 1;
                    setQuantity((prev) => prev + 1)
                    element.price += data.price;
                }
            });
            window.localStorage.setItem('cart', JSON.stringify(newCart));
        }
        dispatchUpdateCartEvent();
    }

    const decrease = () => {
        const cart = window.localStorage.getItem('cart');
        if(cart) {
            const newCart = JSON.parse(cart!);

            if(quantity <= 1) {
                const index = newCart.findIndex((item: any) => item.id === data.id);
                if (index > -1) {
                    newCart.splice(index, 1);
                    setInCart(false);
                }
            } else {
                newCart.forEach((element: any) => {
                    if(element.id === data.id) {
                        element.quantity -= 1;
                        element.price -= data.price;
                        setQuantity((prev) => prev - 1);
                    }
                });
            }   
            window.localStorage.setItem('cart', JSON.stringify(newCart));
        }
        dispatchUpdateCartEvent();
    }

    useEffect(() => {
        document.addEventListener('cart_clear', () => setCartCleared(true));

        return () => {
            document.removeEventListener('cart_clear', () => setCartCleared(true));
        }
    }, []);

    useEffect(() => {
        if(!cartCleared) {
            return;
        }
        const cart = window.localStorage.getItem('cart');
        setCartCleared(() => false)
        if(!cart) {
            return;
        }
        const parsedCart = JSON.parse(cart!);
        const el = parsedCart.find((el:any) => el.id === data.id)

        if(el) {
            setInCart(true);
            setQuantity(el.quantity);
        } else {
            setInCart(false);
            setQuantity(1);
        }
    }, [cartCleared, data.id])

    return <>
        <div className={styles.productsCard}>
            <img 
              alt='product' 
              src={data.image_url} 
              width={281} 
              height={366} 
              className={styles.cardImage} 
            />
            <p className={styles.productName}>{data.title}</p>
            <p className={styles.productDescription}>{data.description}</p>
            <p className={styles.productPrice}>{data.price}</p>
            {inCart ? 
            <div className={styles.allButtonsWrapper}>
              <PrimaryButton customClassName={styles.tripleButton} text='-' onClick={decrease} />
              <PrimaryButton customClassName={styles.tripleButton} text={quantity.toString()} />
              <PrimaryButton customClassName={styles.tripleButton} text='+' onClick={increase} />
            </div>
            : 
            <PrimaryButton text='Купить' onClick={buy} />}
        </div>
    </>;
}