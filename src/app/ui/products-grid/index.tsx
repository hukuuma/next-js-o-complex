"use client"
import React, { useState, useEffect } from 'react';
import ProductsCard from '../cards/products-card';
import { GOODS_URL } from '../../lib/consts';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './styles.module.css';

const ProductsGrid = ({ firstPage }: any) => {
  const [data, setData] = useState([] as any);
  const [page, setPage] = useState(2);

  const fetchData = async () => {
    const response = await fetch(GOODS_URL(page));
    const newData = await response.json();
    setData([...data, ...newData.products]);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      className={styles.grid}
    >
      {firstPage.map((product: any, index: any) => (
        <ProductsCard data={product} key={index} />
      ))}
      {data.map((product: any, index: any) => (
        <ProductsCard data={product} key={index} />
      ))}
    </InfiniteScroll>
  );
};

export default ProductsGrid;