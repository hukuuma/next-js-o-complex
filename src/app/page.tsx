import React from 'react';
import axios from 'axios';
import { GOODS_URL, REVIEWS_URL } from './lib/consts';
import ShoppingCart from "./ui/shopping-cart";
import ProductsGrid from './ui/products-grid';
import FeedbackCard from "./ui/cards/feedback-card";
import ProductsCard from "./ui/cards/products-card";
import styles from "./page.module.css";

async function getServerSideReviews() {
  const reviews = await axios.get(REVIEWS_URL)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
        })

  return reviews
}

async function getServerSideProducts() {
  const products = await axios.get(GOODS_URL(1))
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
        })

  return products
}


export default async function Home() {
  const products = await getServerSideProducts();
  const reviews = await getServerSideReviews();

  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainTitleWrapper}>
          <p className={styles.mainTitle}>тестовое задание</p>
        </div>
        <div className={styles.feedback}>
          {reviews && reviews.map((review: any, index: number) => {
            return <FeedbackCard data={review.text} key={index} />
          })}
        </div>
        <ShoppingCart />
        <ProductsGrid firstPage={products.products}/>
      </div>
    </main>
  );
}
