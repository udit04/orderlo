import React from 'react'
import Login from '../src/components/RestoLogin/RestoLogin';
import Head from 'next/head'
function Restologin() {
    return (
        <div>
            <Head >
                <title>Ordrlo | Dashboard Login</title>
            </Head>
            <Login />
        </div>
    )
}

export default Restologin
