import React, { useState, useContext, useEffect } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {

  const [category,setCategory] = useState("All")
  const [showCartPopup, setShowCartPopup] = useState(false)
  const { getTotalCartAmount, cartItems } = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (getTotalCartAmount() > 0) {
      setShowCartPopup(true)
    } else {
      setShowCartPopup(false)
    }
  }, [getTotalCartAmount])

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
      {showCartPopup && (
        <div className="small-cart-popup" onClick={() => navigate('/cart')}>
          <div className="small-cart-content">
            <span className="cart-icon">🛒</span>
            <button onClick={(e) => { e.stopPropagation(); setShowCartPopup(false); }}>×</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
