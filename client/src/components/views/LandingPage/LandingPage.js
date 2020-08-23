import React, { useEffect} from 'react'
import axios from 'axios'

function LandingPage() {

    // Landing 페이지에 들어오자마자 get req보냄
    useEffect(() => {
        axios.get('http://localhost:5000/api/hello') //end point : api/hello
        .then(response => console.log(response.data)) // 그후 서버로부터 돌아오는 res를 콘솔에 보여줌
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
