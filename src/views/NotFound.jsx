import React from 'react'
import NotFoundImage from 'assets/images/404.jpg'
import { useEffect } from 'react'
const NotFound = () => {
    useEffect(() => {
        const body = document.body
        body.style.background = '#ffff'
    }, [])
    return (
        <div className="page notfound">
            <div className="notfound__content">
                <img src={NotFoundImage} alt="notfound-image" />
            </div>
        </div>
    )
}

export default NotFound
