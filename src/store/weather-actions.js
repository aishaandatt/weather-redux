import { useEffect, useState } from "react";
import { weatherActions } from "./weather-slice";
import axios from "axios";

// const apiKey = 'f056515d976a4e22bfe412b791ca04e9'
const apiKey2 = '04917fbf4817750e09b47a725734c8ec'
// export const FetchData = () => {
//     return async (dispatch) => {
//         const fetchHandler = async (city = "London") => {
//             dispatch(weatherActions.pending())
//             await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey2}`, {
//                 params: {
//                     q: city,
//                     units: "Metric",
//                     lang: 'en'
//                 }
//             })
//                 .then(response =>
//                     dispatch(weatherActions.success(response.data)),

//                 )
//                 .catch(err => {
//                     console.log(err.response, err)
//                     dispatch(weatherActions.error())
//                 })
//         }
//         fetchHandler()
//     }
// }
export const FetchData = (city = "London") => async dispatch => {
    dispatch(weatherActions.pending())
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey2}`, {
        params: {
            q: city,
            units: "Metric",
            lang: 'en'
        }
    })
        .then(response =>
            dispatch(weatherActions.success(response.data)),

        )
        .catch(err => {
            console.log(err.response, err)
            dispatch(weatherActions.error())
        })
}
