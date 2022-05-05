import React, { useContext, useEffect } from 'react'

import UserContext from '../../../context/user/userContext'

const Home = (props) => {

    const userContext = useContext(UserContext);

    useEffect(() => {

    }, [])

    return (
        <>
            {
                userContext.user.verification &&
                <h1 onClick={(e) => { console.log(userContext.user.verification.basic) }}>ggg</h1>
            }
        </>
    )

}

export default Home;