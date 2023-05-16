import React from 'react'
import axios from 'axios'
import ProductCard from '../ProductCard/ProductCard'
import './orders.scss'
import { Link } from 'react-router-dom'

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    try {
      (async () => {
        const {data} = await axios.get('http://localhost:3001/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items],[]))
        setIsLoading(false)
      })()
    } catch (err) {
      alert('Error!')
      console.error(err)
    }
  },[])
  return (
    <div className="orders">
        <div className="flex">
          <h1>Мои заказы</h1>
        </div>
      {
        orders.length > 0  ? <div className="mirs">
        {(isLoading ? [...Array(8)] : orders).map((item, idx) => {
          return <ProductCard
            loading={isLoading}
            key={idx}
            {...item}
            />
          })
        }
      </div> : <>
      <div className="flexCenter">
        <div className='center'>
          <img src="images/smile1.png" alt="" />
          <h3>У вас нет заказов</h3>
          <p>Оформите хотя бы один заказ.</p>
          <Link to="/">
            <button className='greenBtn'><img src="images/arraw.svg" alt="stelka" /> Вернуться назад</button>
          </Link>
          
        </div>
      </div>
      </>
      }
    </div>
  )
}

export default Orders