import React, { useState,useEffect } from 'react'
import { testimonials } from '../../../../Data/Home/DummyReviewData'
import girlAvatar from '../../../../assets/home-girl-avtar.png'
import boyAvatar from '../../../../assets/sonu-img.png'
import '../../styles/Home/ReviewSection.scss'

const ReviewSection = () => {

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="testimonial-card">

            {/* Left Image - Change Hogi */}
            <div className="left-avatar">
                <img src={girlAvatar} alt="animated girl" />
            </div>

            {/* Center Content */}
            <div className="testimonial-content">
                <h3>What Our Students Say</h3>

                <p>{testimonials[current].review}</p>

                <h4>---  {testimonials[current].name}</h4>

                <div className="dots">
                    {testimonials.map((_, index) => (
                        <span
                            key={index}
                            className={current === index ? "active" : ""}
                        />
                    ))}
                </div>
            </div>

            {/* Right Avatar - Change Hoga */}
            <div className="right-avatar">
                <div className="user-avatar-right">

                    <img src={boyAvatar} alt="user img" />
                </div>
            </div>

        </div>
    )
}

export default ReviewSection
