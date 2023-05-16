import React from 'react'
import AppContext from '../../context'

import styles from '../Shadow/shadow.module.scss'

const Info = ({title, image, descr}) => {
  const {setCartOpened} = React.useContext(AppContext) 
  return (
    <div className={styles.box}>
          <img src={image} alt="box" />
          <h2>{title}</h2>
          <p>{descr}</p>
          <button onClick={() => setCartOpened(false)} className='greenBtn'><img src="images/arraw.svg" alt="stelka" /> Вернуться назад</button>
      </div>
  )
}


export default Info