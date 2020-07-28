import React from 'react'
import PromoitonAnimation from './PromoAnimation'
import Enroll from './Enroll'

const Promotion = () => {
  return (
    <div className="promotion_wrapper" style={{background: '#ffffff'}}>
      <div className="container">
        <PromoitonAnimation/>
        <Enroll/>
      </div>
    </div>
  )
}

export default Promotion
