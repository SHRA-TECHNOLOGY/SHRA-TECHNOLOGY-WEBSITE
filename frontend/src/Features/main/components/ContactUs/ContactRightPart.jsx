import React from 'react'
import '../../styles/ContactUs/ContactRightPart.scss'
import { Phone, Mail, LocateFixed } from 'lucide-react'
import { socialMediaIcon } from '../../../../Data/SocialMedia/SocialIcon'

const ContactRightPart = () => {

    const information = [
        {
            id: 1,
            title: "Email",
            value: "sy2440052@gmail.com",
            icon: Mail
        },
        {
            id: 2,
            title: "Phone",
            value: "+91 7054161573",
            icon: Phone
        },
        {
            id: 3,
            title: "Address",
            value: "Tamkuhi Road, Kushinagar, UP, 274406",
            icon: LocateFixed
        },
    ]

    return (
        <div className='contact-right-part'>

            {/* header */}
            <div className="contact-right-header">
                <span><Phone size={18} /></span>
                <h3>Get in Touch</h3>
            </div>

            {
                information.map(item => {
                    const Icon = item.icon
                    return (
                        <div className="address-card" key={item.id}>
                            <span className='icon'><Icon /></span>
                            <h3>{item.title}  <span>{item.value}</span></h3>
                        </div>
                    )
                })
            }

            <div className="social-media-link">
                <h3>Follow Us</h3>
                <div className="all-link">
                    {
                        socialMediaIcon.map(item =>{
                            return (
                                <div className="logo-link" key={item.id} >
                                    <img src={item.icon} alt="logo" />
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>

        </div>
    )
}

export default ContactRightPart
