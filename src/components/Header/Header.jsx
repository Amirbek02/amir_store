import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'
import { useHooks } from '../../Hooks/hooks'
function Header(props) {
  const {totalSum} = useHooks();
  return (
    
    <header className="header">
      <Link to="/">
        <div className="headerLeft">
          
          <div className="logo">
              <img className='logo__img' src='images/logo2.png' alt="" />
          </div>
          <div className="logo__theme">
            <h1 className="logo__title">
              Amir Store
            </h1>
            <p className="logo__text">
              Магазин лучших кроссовок
            </p>
          </div>
          
        </div>
      </Link>
    <ul className="headerRight">
      <li onClick={props.onClickCart} className="headerRight__item">
        <img src='images/basket.svg' alt="" />
        <span>{totalSum} сом.</span>
      </li>
      <li className="headerRight__item">
        <Link to="/favorite">
          <img src='images/heart.svg' alt="" />
        </Link>
      </li>
      <li className="headerRight__item">
        <Link to="/orders">
          <img src='images/Union.svg' alt="" />
        </Link>
      </li>
    </ul>
  </header>
  )
}

export default Header