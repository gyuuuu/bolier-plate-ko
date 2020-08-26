import React, { useEffect} from 'react'
import axios from 'axios'
//import { response } from 'express'

function LandingPage(props) {

    // Landing 페이지에 들어오자마자 get req보냄
    useEffect(() => {
        axios.get('/api/hello') //end point : api/hello
        .then(response => console.log(response.data)) // 그후 서버로부터 돌아오는 res를 콘솔에 보여줌
    }, [])

    // 로그아웃 버튼 클릭시 
    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push('/login') // 로그아웃 성공하면 로그인 페이지로 이동
            } else {
                alert('로그아웃하는데 실패 했습니다.')
            }
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'
                , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage
