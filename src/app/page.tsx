import ShoppingCart from "./ui/shopping-cart";
import FeedbackCard from "./ui/cards/feedback-card";
import ProductsCard from "./ui/cards/products-card";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainTitleWrapper}>
          <p className={styles.mainTitle}>тестовое задание</p>
        </div>
        <div className={styles.feedback}>
          <FeedbackCard />
          <FeedbackCard />
        </div>
        <ShoppingCart />
        <div className={styles.productsGrid}>
          <ProductsCard />
        </div>
      </div>
    </main>
  );
}
