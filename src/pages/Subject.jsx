import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAxios } from "../api/api";
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser'

const Subject = () => {
    const { id } = useParams();
    const [announcementData, setAnnouncementData] = useState()
    const getData = async () => {
        try {
            let params = { "q": "proxy" };
            let headers = {
                'Api-Key': 'umbraco-demo-key'
            };
            getAxios("get", `/umbraco/delivery/api/v1/content/item/` + id, params, headers)
                .then(data => {
                    setAnnouncementData(data)

                })
        } catch (err) {
            console.error(err);
        }
    }
    const download = (file) => {
        fetch(file.url)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = file.name;
                    a.click();
                });
            });

    };

    useEffect(() => {
        getData()


    }, [])

    return (


        (announcementData ?
            <div >
                <div ><span style={{ 'fontWeight': 600 }}>subject:</span> {announcementData.properties.subject}</div>
                <div><span style={{ 'fontWeight': 600 }}>effectiveDate: </span>{announcementData.properties.effectiveDate}</div>
                <div ><span style={{ 'fontWeight': 600 }}>expiryDate:</span> {announcementData.properties.expiryDate}</div>
                <div ><span style={{ 'fontWeight': 600 }}>content:</span> {parse(announcementData.properties.content.markup)}</div>
                <div ><span style={{ 'fontWeight': 600, "paddingRight": " 10px" }}>attachment:</span>

                    {announcementData.properties.filesUpload ? announcementData.properties.filesUpload.map((data, index) =>
                        <div key={index}> {data.name} <button onClick={() => download(data)}>Download</button></div>
                    )
                        : '(empty)'}
                </div>

            </div>
            : "loading"
        )






    )

}

export default Subject