import React, { useState } from 'react'

import './productCard.scss'
import AppContext from '../../context';
import Skeleton from './Skeleton';

function ProductCard({id, productImg, productText, productCost, onPlus, onFavorite, favorited = false, loading}) {
  
  const {getAddedItems} = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited);
  const onClickPlus = () => {
    onPlus({ id, productImg, productText, productCost})
  }
  const onClickFavorite = () => {
    onFavorite({ id, productImg, productText, productCost})
    setIsFavorite(!isFavorite)
  }
  
  return (
      <div className="card">
            {loading ?  <Skeleton key={id}/> : <>
            {onFavorite && <button className='heartBtn' onClick={onClickFavorite}>
              <img className='favorite'  src={isFavorite ? 'images/heart-liked.svg' :'images/heart-unloked.svg'} alt="" />
            </button>}
            
            <img className='card__img' src={productImg} alt="" />
            <p className="card__text">{productText}</p>
            <div className="basket">
              <div className='card__cost'>
                <span>Цена:</span>
                <b>{productCost} сом.</b>
              </div>
              { onPlus && <button onClick={onClickPlus} className="card__btn">
                <img src={getAddedItems(id) ? 'images/added.svg' : 'images/plus.svg'} alt="" />
              </button>}
            </div>
            </>}
      </div>
  )
}

export default ProductCard