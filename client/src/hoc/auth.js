import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    //option ?
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    //adminRoute : admin 유저만 들어갈수 있는 페이지면 true

    //서버에 req를 요청해 현재 접속한 유저의 상태를 가져온다
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log(response)

                // 로그인하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){ //admin이 아닌데 admin만 들어갈수 있는 페이지 진입하려고 할때
                        props.history.push('/')
                    } else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}