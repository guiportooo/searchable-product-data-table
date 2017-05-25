import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ProductRow = (props) => {
  const name = props.product.stocked ?
    props.product.name :
    <span className='lbl-danger'>{props.product.name}</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{props.product.price}</td>
    </tr>
  )
}

const ProductCategoryRow = (props) => {
  return (
    <tr><th colSpan='2'>{props.category}</th></tr>
  )
}

const ProductTable = (props) => {
  const shouldHideProduct = (product) =>
    product.name.indexOf(props.filterText) === -1 || (!product.stocked && props.inStockOnly)

  const mapProductRows = (products) => {
    let rows = []
    let lastCategory = null

    products.forEach((product) => {
      if (shouldHideProduct(product))
        return

      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
      }

      rows.push(<ProductRow key={product.name} product={product} />)
      lastCategory = product.category
    })

    return rows
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {mapProductRows(props.products)}
        </tbody>
      </table>
    </div>
  )
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this)
    this.handleInStockOnlyInputChange = this.handleInStockOnlyInputChange.bind(this)
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterText(e.target.value)
  }

  handleInStockOnlyInputChange = (e) => {
    this.props.onInStockOnly(e.target.checked)
  }

  render() {
    return (
      <div>
        <form>
          <input type='text' placeholder='Search...' value={this.props.filterText} onChange={this.handleFilterTextInputChange} />
          <p>
            <input type='checkbox' checked={this.props.inStockOnly} onChange={this.handleInStockOnlyInputChange} />
            {' '}
            Only show products in stock
      </p>
        </form>
      </div>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterText: '',
      inStockOnly: false
    }

    this.handleFilterText = this.handleFilterText.bind(this)
    this.handleInStockOnly = this.handleInStockOnly.bind(this)
  }

  handleFilterText(filterText) {
    this.setState({
      filterText: filterText
    })
  }

  handleInStockOnly(inStockOnly) {
    console.log(this)
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterText={this.handleFilterText}
          onInStockOnly={this.handleInStockOnly} />
        <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    )
  }
}

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
        <FilterableProductTable products={products} />
      </div>
    );
  }
}

export default App;
