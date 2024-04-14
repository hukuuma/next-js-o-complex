"use client"
import React, { useEffect, useState } from 'react';
import { InputMask } from '@react-input/mask';
import { ORDER_URL } from '@/app/lib/consts';
import axios from 'axios';
import PrimaryButton from '../buttons/primary-button/index';
import ModalResult from '../modal';
import styles from './styles.module.css';

const trim = (str: string) => str.replace(/[^0-9]/g, '').replace(' ', '');

function dispatchUpdateClearCartEvent() {
    document.dispatchEvent (
        new CustomEvent('cart_clear')
    )
}

export default function ShoppingCart({}) {
    const [cart, setCart] = useState([]);
    const [cartUpdated, setCartUpdated] = useState(true);
    const [errorForm, setErrorForm] = useState(false);
    const [modalInfo, setModalInfo] = useState({} as any)

    const getTel = () => {
        if(typeof window !== "undefined") {
            const tel = window.localStorage.getItem('tel');
            if(!tel) {
                return '+7'
            }
            return tel
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setErrorForm(false);
        const trimmedTel = trim(e.target[0].value);

        if (trimmedTel.length < 11) {
            setErrorForm(true);
            return;
        }

        window.localStorage.setItem('tel', e.target[0].value);
    
        const cart = window.localStorage.getItem('cart');
        const parsedCart = JSON.parse(cart!);
        const body = {
            phone: trimmedTel,
            cart: parsedCart.map((el: any) => {
                return {id: el.id, quantity: el.quantity}
            })
        }
    
        const res = await axios.post(
            ORDER_URL,
            body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
        )

        if(res.data.success === 0) {
            setModalInfo({success: false, message: "Вы не выбрали ни один товар."})
        } else {
            setModalInfo({success: true, message: "Благодарим за покупку!"})
            window.localStorage.setItem('cart', JSON.stringify([]));
            setCartUpdated(true)
            dispatchUpdateClearCartEvent()
        }
    }

    useEffect(() => {
        document.addEventListener('cart_update', () => setCartUpdated(true));

        return () => {
            document.removeEventListener('cart_update', () => setCartUpdated(true));
        }
    }, []);

    useEffect(() => {
        if(!cartUpdated) {
            return;
        }
        const cart = window.localStorage.getItem('cart');
        setCartUpdated(() => false)
        if(!cart) {
            return;
        }
        setCart(() => JSON.parse(cart!))
    }, [cartUpdated])

    return (
        <div className={styles.cart}>
            <p className={styles.cartTitle}>Добавленные товары</p>
            <div className={styles.cartList}>
                {cart.map((el: any, index: number) => {
                    return <div key={index} className={styles.row}>
                        <span className={styles.productName}>{el.name}</span>
                        <span className={styles.productQuantity}>x{el.quantity}</span>
                        <span className={styles.productPriceAmount}>{el.price}₽</span>
                    </div>
                })}
            </div>
            <div>
                <form onSubmit={onSubmit} className={styles.cartSubmit}>
                    <InputMask 
                        mask="+7 (___) ___-__-__" 
                        replacement={{ _: /\d/ }}
                        defaultValue={getTel()}
                        className={`${styles.numberInput} ${errorForm && styles.error}`} 
                        name='tel'
                    />
                    <PrimaryButton text='Заказать' htmlType='submit' />
                </form>
            </div>
            {modalInfo?.message && 
              <ModalResult success={modalInfo.success} message={modalInfo.message} onClose={() => setModalInfo({})}/>
            }
        </div>
   )
}