import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAxios } from "../api/api";

const Home = () => {

    const [announcementData, setAnnouncementData] = useState()
    const getData = async () => {
        try {
            let params = { "q": "proxy" };
            let headers = {
                'Api-Key': 'umbraco-demo-key'
            };
            getAxios("get", "/umbraco/delivery/api/v1/content", params, headers)
                .then(data => {
                    setAnnouncementData(data.items)

                })
            // let result = axios.get('/umbraco/delivery/api/v1/content?q=proxy')
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        getData()

    }, [])



    return (
        <div>
            <h1>Umbraco Demo Test</h1>
            {announcementData ? announcementData.filter(data => data.contentType === 'announcement').map((data, index) =>
                <Link key={index} to={`/Subject/${data.id}`}><div >{data.name}</div></Link>

            ) : ''}

        </div>
    )

}

export default Home