import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1>Slice.</h1>
            <p>Order from the best local restaurants with just a few taps. From pizza to pasta and everything in between, get a slice of what you're craving, hot and fresh, right to your door. Simple ordering, lightning-fast delivery.</p>
            <div className="footer-social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={assets.facebook_icon} alt="Facebook" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={assets.twitter_icon} alt="Twitter" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
                </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9815834588</li>
                <li>contact@slice.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © Slice.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
