import { useEffect, useState } from "react"
import { GetMyOrderStatus } from "../services/order-service"


const OrderStatus=({props})=>{

    console.log(props)
    
    return(
        <section class="root order-status">
  <figure>
    <img src="https://images.melorra.com/image/upload/h_350,w_350,f_auto,fl_progressive/v1571040732/live-melorra/dev/catalogue/images/TG/OPT/580/W19WTG16F_C_580.jpg" alt="" />
    <figcaption>
      <h4>Some Jewellery Name</h4>
      <h6>Category</h6>
      <h2>₹ 23,456</h2>
    </figcaption>
  </figure>

  <div class="order-track">
            <div class="order-track-step">
                <div class="order-track-status">
                    <span class="order-track-status-dot"></span>
                    <span class="order-track-status-line"></span>
                </div>
                <div class="order-track-text">
                    <p class="order-track-text-stat">Order Received</p>
                    <span class="order-track-text-sub">21st November, 2019</span>
                </div>
            </div>

            <div class="order-track-step">
                <div class="order-track-status">
                    <span class="order-track-status-dot"></span>
                    <span class="order-track-status-line"></span>
                </div>
                <div class="order-track-text">
                    <p class="order-track-text-stat">Order Processed</p>
                    <span class="order-track-text-sub">21st November, 2019</span>
                </div>
            </div>

            <div class="order-track-step">
                <div class="order-track-status">
                    <span class="order-track-status-dot"></span>
                    <span class="order-track-status-line"></span>
                </div>
                <div class="order-track-text">
                    <p class="order-track-text-stat">Manufracturing In Progress</p>
                    <span class="order-track-text-sub">21st November, 2019</span>
                </div>
            </div>

            <div class="order-track-step">
            <div class="order-track-status">
                <span class="order-track-status-dot"></span>
                <span class="order-track-status-line"></span>
            </div>
            <div class="order-track-text">
                <p class="order-track-text-stat">Order Dispatched</p>
                <span class="order-track-text-sub">21st November, 2019</span>
            </div>
            </div>
            <div class="order-track-step">
            <div class="order-track-status">
                <span class="order-track-status-dot"></span>
                <span class="order-track-status-line"></span>
            </div>
            <div class="order-track-text">
                <p class="order-track-text-stat">Order Deliverd</p>
                <span class="order-track-text-sub">21st November, 2019</span>
            </div>
            </div>
  </div>
</section>
    )
}

export default OrderStatus