

import React, { useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard/ProductCard';
import Header from './components/Header/Header';
import Shadow from './components/Shadow/Shadow';
import AppContext from './context';
import Content from './components/Content/Content';
import Favorite from './components/Favorite/Favorite';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Orders from './components/Orders/Orders';
function App() {
  const [items, setItems] = useState([]);
  const [cartItem, setCartItem] = useState([])
  const [favorite, setFavorite] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
      async function acyncFunction() {
        const itemsData = await axios.get('http://localhost:3001/items')
        const heartData = await axios.get('http://localhost:3001/heart')
        const storesData = await axios.get('http://localhost:3001/stores')

        setIsLoading(false)
        setCartItem(itemsData.data)
        setFavorite(heartData.data)
        setItems(storesData.data)
      }
      acyncFunction()
    },[])
  

  const AddToItems = (obj) => {
    
    if (cartItem.find(item => item.id === obj.id)) {
      axios.delete(`http://localhost:3001/items/${obj.id}`)
    
      setCartItem(prev => [...prev.filter((item) => item.id !== obj.id)])
    } else {
      axios.post('http://localhost:3001/items', obj)
     setCartItem(prev =>[...prev, obj])
    } 
  }
  const onAddFavorite = async (obj) => {
    try {
      if (favorite.find(favObj => favObj.id === obj.id)) {
        axios.delete(`http://localhost:3001/heart/${obj.id}`)
        setFavorite(prev => [...prev.filter((item) => item.id !== obj.id)])
      } else {
        const {data} = await axios.post('http://localhost:3001/heart', obj)
        setFavorite(prev =>[...prev, data])
      }
    } catch (err) {
      alert('error :(')
    }     
    }
  const onRemoveItems = (id) => {
    axios.delete(`http://localhost:3001/items/${id}`)
     setCartItem(prev =>[...prev.filter((item) => item.id !== id)])
  }

  



  const SearchValueChange = (event) => {
    setSearchValue(event.target.value)
    console.log(event.target.value)
  }

  const getAddedItems = (id) => {
    return cartItem.some(obj => Number(obj.id) === Number(id))

    
  }

  console.log(isLoading)
  return (
    <AppContext.Provider value={{items, cartItem, favorite, onAddFavorite, getAddedItems, setCartOpened, setCartItem}}>
      <div className="wrapper">
        <Shadow onItems={cartItem} onRemove={onRemoveItems} onClose={() => setCartOpened(false)} opened= {cartOpened}/> 
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route path='/' element={
            <Content 
                onToAddFavorite={onAddFavorite}
                searchValue={searchValue}
                SearchValueChange={SearchValueChange}
                items={items}
                
                ProductCard={ProductCard}
                cartItem={cartItem}
                AddToItems={AddToItems}
                isLoading={isLoading}
              />}/>
          <Route path='/favorite' element={
            <Favorite
              />}/>
          <Route path='/orders' element={
            <Orders/>
          }/>
          <Route path='' element/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
