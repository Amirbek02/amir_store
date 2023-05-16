import React from 'react'

import axios from 'axios';
import Info from '../ProductCard/Info'
import styles from  './shadow.module.scss'
import { useHooks } from '../../Hooks/hooks';

function Shadow({onClose, onRemove, onItems=[], opened }) {
  const {totalSum, setCartItem, cartItem} = useHooks()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrder, setOrder] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post('http://localhost:3001/orders', {items: cartItem,});
      setOrderId(data.id)
      setOrder(true);
      setCartItem([]);
      for (let i = 0; i< cartItem.length; i++) {
        const item = cartItem[i];
        console.log(item.id)
        await axios.delete('http://localhost:3001/items/' + item.id)
        await delay(1000)
      }
    } catch (err) {
      alert(`Erroor :(`)
    }
    setIsLoading(false)
  }
  return (
    <div className={`${styles.shadow}  ${opened ? styles.shadowVisible : ''}`}>
      <div className={`${styles.block}`}>
        <h2 className={styles.block__basket}>Корзина <img onClick={onClose} className='removeBtn' src='images/btn-remove.svg' alt="" /></h2>
        {
          onItems.length > 0 ? <><div className={styles.item}>
          {onItems.map((obj) => (
              <div key={obj.id} className={styles.cartItem}>
                <div style={{backgroundImage: `url(${obj.productImg})`}} className={styles.cartItemImg}></div>
                <div>
                  <p>{obj.productText}</p>
                  <b>{obj.productCost}сом.</b>
                </div>
                <img onClick={() => onRemove(obj.id)} className={styles.removeBtn} src='images/btn-remove.svg' alt="" />
              </div>
            ))          
          }
        </div>
        <div className={styles.cartItemBlock}>
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>{totalSum} сом.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>{Math.round(totalSum * 0.05)} сом.</b>
            </li>
          </ul>
          <button disabled={isLoading} onClick={onClickOrder} className= 'greenBtn'>
            Оформить заказ
            <img src="images/stelka.svg" alt="stelka" />
          </button>
        </div> </> :
         <Info title={ isOrder ? 'Заказ оформлен!' :"Корзина пустая"} descr= { isOrder ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} image={ isOrder ? '/images/order.jpg' : "/images/box.jpg"}/> 
        }
        
      </div>
  </div>        
)}


export default Shadow