import { GetServerSideProps } from "next";
import axios  from "axios";

const getData = async (url:string, context:any) =>  {

    const BASE_URL = 'http://localhost:8080';

    const token = context.req.cookies.jwt;

    return await axios.get(`${BASE_URL}/${url}`, {
        headers: {
            Authorization:  `Bearer ${token}`,
        }
    })
}

export const getUserData: GetServerSideProps =async (context) => {
    try {
    const userData = (await getData("user", context)).data
    return {
        props : {
            userData,
        }
    }
    } catch (error) {
        console.error(error)
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
}

export const getChannelData: GetServerSideProps = async (context) => {
    try {
        const channelData = (await getData("channel", context)).data
        return {
            props : {
                channelData,
            }
        }
        
    } catch (error) {
        console.error(error)
        return {
            redirect: {
                destination: "/channel/create",
                permanent: false,
            }
        }
    }
};