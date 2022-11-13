import { useEffect } from 'react'

import './Support.css'

export default function Support(props) {

    useEffect(() => {
        props.setSidebar(false)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <div>
            <h1>Support</h1>
        </div>
    )
}