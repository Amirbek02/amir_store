import React from 'react'

import ProductCard from '../ProductCard/ProductCard'
import AppContext from '../../context'
import './favorite.scss'
import { Link } from 'react-router-dom'

function Favorite() {

  const {onAddFavorite, favorite} = React.useContext(AppContext);
  
  return (
    <div className="favorites">
        <div className="flex">
          <h1>Мои закладки</h1>
        </div>
      {favorite.length > 0 ? <div className="mirs">
        {favorite.map((item) => {
          return <ProductCard 
            key={item.id}
            favorited={true}
            onFavorite={onAddFavorite}
            {...item}
            />
          })
        }
      </div> :  <>
      <div className="flexCenter">
        <div className='center'>
          <img src="images/smile2.png" alt="" />
          <h3>{'Закладок нет :('}</h3>
          <p>Вы ничего не добавляли в закладки</p>
          <Link to="/">
            <button className='greenBtn'><img src="images/arraw.svg" alt="stelka" /> Вернуться назад</button>
          </Link>
          
        </div>
      </div>
      </>}
    </div>
  )
}

export default Favorite