import React,{useState} from 'react'
import { Search, ChevronDown } from 'lucide-react'

const HeroSection = ({placeholder,categories,title}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState('All Categories')

    return (
        <>

            {/* course feature search aur category  */}

            <div className="course-features">

                {/* search box */}

                <div className="course-search-box">
                    <Search className='Icon' />
                    <input type="text" placeholder={placeholder} />
                </div>

                {/* category select box */}

                <div className="category-dropdown">
                    <div className="dropdown-header" onClick={() => {
                        setIsOpen(!isOpen)
                    }}>
                        <span>{selected}</span>
                        <ChevronDown color='gray' />
                    </div>

                    {
                        isOpen && (
                            <div className="dropdown-menu">
                                {categories.map((item) => (
                                    <div
                                        key={item}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelected(item);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default HeroSection
