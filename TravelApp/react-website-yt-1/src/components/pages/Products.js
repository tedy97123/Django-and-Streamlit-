import React from 'react';
import '../../Apps.css';
import Cards from '../Cards'
import Footer from '../Footer'
import {Products as Items} from '../Products1/Products'
export default function Products() {
  return (
    <>
  <h1 className='products'>PRODUCTS</h1>
  <Cards />
  <Items />
  <Footer />
  </>
  );
}