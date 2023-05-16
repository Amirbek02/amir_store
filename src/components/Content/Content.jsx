import React from 'react'
import ProductCard from '../ProductCard/ProductCard'

import './content.scss'
// import AppContext from '../../context'

function Content({items,  searchValue, setSearchValue, AddToItems, SearchValueChange, onToAddFavorite, isLoading}) {

  // const {onAddFavorite} = React.useContext(AppContext)
  const renderItems = () => {
    const filterItems = items.filter((item) => item.productText.toLowerCase().includes(searchValue.toLowerCase()));
    console.log(filterItems)
    return (isLoading ? [...Array(10)] : filterItems).map((item, index) => (
       <ProductCard 
          key={index}
          onPlus = {(obj) => AddToItems(obj)}
          onFavorite={(obj) => onToAddFavorite(obj)}
          loading={isLoading}
          {...item}
        />
    )
    )}
  return (
    <div className="content">
        
    <div className="flex">
      <h1>{searchValue ? `Поиск по: "${searchValue}"` : 'Все кроссовки'}</h1>
      <div className="input">
        <img src='images/loading.svg' alt="Search" />
        {searchValue && <img onClick={() => setSearchValue(" ")} className='removeBtn clear' src='images/btn-remove.svg' alt="" />}
        <input onChange={SearchValueChange} value={searchValue} type="text" placeholder='Поиск...' />
      </div>
        
    </div>
    <div className="mir">
      {renderItems()}
    </div>
  </div>
  )
  // .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())
}

export default Content