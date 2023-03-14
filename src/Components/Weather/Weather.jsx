import React, { useEffect, useState } from 'react'
import './Weather.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Search from './Search'
import axios from 'axios';
import useColorThief from 'use-color-thief'
import LoadingIcons from 'react-loading-icons'
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from '../../store/weather-actions'
const Weather = () => {
    const [images, setImages] = useState('');
    const [getCity, setGetCity] = useState('');
    const [searchText, setSearchText] = useState('')
    const [recentSearches, setRecentSearches] = useState([])
    const [city, setCity] = useState('London');
    const data = useSelector((state) => state.weather.data)
    console.log(data)
    const dispatch = useDispatch()
    const apiKey = 'm8EMEussAHeDbC07Jb1Y4Is13NHKMN3QQCl6RtFCsxQugE8hQaui7kY6';
    const apiUrl = 'https://api.pexels.com/v1/search';
    const loading = useSelector((state) => state.weather.loading)
    const error = useSelector((state) => state.weather.error)
    const success = useSelector((state) => state.weather.success)
    console.log(`loading : ${loading} error : ${error} success : ${success}`)
    const [src, setSrc] = useState('https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg')
    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' });
    const date = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const inputHandler = (event) => {
        setGetCity(event.target.value);
        setSearchText(event.target.value)
    };
    const test = () => {
        return
    }
    const submitHandler = (e) => {
        setCity(getCity);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCity(getCity)
        }
    }
    const { color, palette = ['grey'] } = useColorThief(src, {
        format: 'hex',
        colorCount: 10,
        quality: 10,
    })
    useEffect(() => {
        console.log(color, palette)
    }, [palette, color, src, city])
    useEffect(() => {
        if (city) { dispatch(FetchData(city)) }
        else {
            dispatch(FetchData())
        }
    }, [dispatch, city])

    const handleSearch = (event) => {
        if (searchText.trim() !== '') {
            const updatedRecentSearches = [...recentSearches, searchText]
                .filter((value, index, self) => self.indexOf(value) === index)
                .slice(-4)
            setRecentSearches(updatedRecentSearches)
            setSearchText('')
            localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches))
        }
        axios.get(apiUrl, {
            headers: {
                Authorization: apiKey,
            },
            params: {
                query: city,
                per_page: 10,
                width: 1920,
                height: 1080,
            }
        })
            .then(response => {
                setImages(response.data.photos[0].src.original);
                setSrc(images)
                console.log("src ", src)
                // setQuery('');
            })
            .catch(error => {
                console.log(error);
                setSrc('https://cdn3.dpmag.com/2021/07/Landscape-Tips-Mike-Mezeul-II.jpg')
            });
    }
    useEffect(() => {
        handleSearch()
        console.log(images)
        const recentSearchesFromLocalStorage = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    }, [city, images])
    useEffect(() => {
        document.body.style.backgroundImage = `url(${src})`;
    }, [src, city])
    return (

        <div className='main'>
            {success && !error && !loading ? (
                <>

                    <div className='left'>
                        <div className='topbar'>
                            <span>the.weather</span>
                        </div>
                        <div className='info'>
                            <div className='temp'>
                                <span> {data.main.temp}°C </span>
                            </div>
                            <div className='city'>
                                <span className='cityname'>
                                    {data.name}
                                    <div className='date'>
                                        <span className='day'>{day}</span>
                                        <span>{date}</span>
                                    </div>
                                </span>
                            </div>
                            <div className='icon'>
                                {/* <img src='/assets/rainy.svg' /> */}
                                <img src={`http://openweathermap.org/img/wn/${success ? data.weather[0].icon : null}@2x.png`} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='right' style={{ border: `0.5px solid ${color}` }}>
                        <div className='panel'>
                            <div className='search'>
                                <div></div>
                                <input
                                    onChange={inputHandler}
                                    placeholder="Search..."
                                    onKeyDown={handleKeyDown}
                                    type='text'
                                    className='form'
                                    style={{
                                        color: color ? palette[0] : 'white',
                                        borderBottom: `2px solid ${color}`,
                                    }}
                                />
                                <button type='submit' onClick={getCity ? submitHandler : test}>

                                    <SearchOutlinedIcon
                                        fontSize='large'
                                        className='search1'
                                        style={{ backgroundColor: palette[0] }}
                                    />
                                </button>
                            </div>
                            <div
                                className='recent'
                                style={{ color: color ? palette[0] : 'white' }}
                            >
                                <div></div>
                                <div className='list'>
                                    {recentSearches.map((e, i) => {
                                        return <span key={i}>{e}</span>
                                    })}
                                    {/* {recentSearches.map((search, index) => (
                                        <span key={index}>{search}</span>
                                    ))} */}
                                </div>
                            </div>
                            <hr style={{ border: `1px solid ${color}` }}></hr>
                            <div className='details'>
                                <span className='detail_heading'>Weather Details</span>
                                <div className='info' style={{ color: color ? palette[0] : 'white' }} >
                                    <div className='cloud'>
                                        <span>Clouds</span>
                                        <span className='num'>{data.clouds.all}%</span>
                                    </div>
                                    <div className='humid'>
                                        {' '}
                                        <span>Humidity</span>
                                        <span className='num'>{data.main.humidity}%</span>
                                    </div>
                                    <div className='wind'>
                                        {' '}
                                        <span>Wind</span>
                                        <span className='num'>{data.wind.speed} Km/h</span>
                                    </div>
                                    <div className='rain'>
                                        {' '}
                                        <span>Feels Like</span>
                                        <span className='num'>{data.main.feels_like} °C </span>
                                    </div>
                                    <div className='desc'>
                                        {' '}
                                        <span>Description</span>
                                        <span className='num'>{data.weather[0].description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : error ? <h3>ERROR</h3> : <div className='load'>
                <div>
                    <LoadingIcons.BallTriangle />
                </div>
            </div>}
        </div>
    )
}

export default Weather


