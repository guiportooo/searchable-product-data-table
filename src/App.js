import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ProductRow = (props) => {
  return (
    <div className='productRow'>
      <label>{props.name}</label> <label>{props.price}</label>
    </div>
  )
}

const ProductCategoryRow = (props) => {
  return (
    <div>
      <label className='productCategory'>{props.name}</label>
    </div>
  )
}

const ProductTable = (props) => {
  const mapProductRow = (category, products) => {
    return products
      .filter(product => product.category === category)
      .map((product, index) =>
        <ProductRow key={index} name={product.name} price={product.price} />
      )
  }

  return (
    <div>
      <div className='productTableTitle'>
        <label>Name</label> <label>Price</label>
      </div>
      <div className='productTable'>
        <ProductCategoryRow name='Sporting Goods' />
        {mapProductRow('Sporting Goods', props.products)}
        <ProductCategoryRow name='Eletronics' />
        {mapProductRow('Eletronics', props.products)}
      </div>
    </div>
  )
}

const SearchBar = (props) => {
  return (
    <div>
      <div>
        <input type='text' placeholder='Search...' />
      </div>
      <div>
        <input type='checkbox' /> Only show products in stock
      </div>
    </div>
  )
}

const FilterableProductTable = (props) => {
  const products = [
    {
      category: 'Sporting Goods',
      price: '$49.99',
      stocked: true,
      name: 'Football'
    },
    {
      category: 'Sporting Goods',
      price: '$9.99',
      stocked: true,
      name: 'Baseball'
    },
    {
      category: 'Sporting Goods',
      price: '$29.99',
      stocked: false,
      name: 'Basketball'
    },
    {
      category: 'Eletronics',
      price: '$99.99',
      stocked: true,
      name: 'iPod Touch'
    },
    {
      category: 'Eletronics',
      price: '$399.99',
      stocked: false,
      name: 'iPhone 5'
    },
    {
      category: 'Eletronics',
      price: '$199.99',
      stocked: true,
      name: 'Nexus 7'
    }
  ]
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload!
        </p>
        <FilterableProductTable />
      </div>
    );
  }
}

export default App;
