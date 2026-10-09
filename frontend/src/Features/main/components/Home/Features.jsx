import React from 'react'
import { featuresData } from '../../../../Data/Home/FeatureCard'
import '../../styles/Home/Features.scss'

const Features = () => {
    return (

        <div className="feature-section">

            <div className="feature-heading-section">
                <span>Platform Features</span>
                <h2>Everything You Need to Succeed</h2>
                <p>Powerful tools and resources carefully designed to accelerate your learning journey.</p>
            </div>

            <div className="feature-cards">

                {featuresData.map((item) => {
                    let Icon = item.icon;

                    return (
                        <div className="feature-card" key={item.id}>
                            <div className="icon-section">
                                <span><Icon size={30} color='#ffffff' /></span>
                                <h3>{item.title}</h3>
                            </div>

                            <p>{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export default Features
