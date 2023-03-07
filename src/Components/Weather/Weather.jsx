import React from 'react'
import './Weather.scss'
const Weather = () => {
    return (
        <div className='main'>
            <div className="left">
                <div className="topbar">
                    <span>the.weather</span>
                </div>
                <div className="info">
                    <div className="temp">
                        <span> 08°C </span>
                    </div>
                    <div className="city">
                        <span className='cityname'>New York City
                            <div className='date'>
                                <span>Sunday</span>
                                <span>6 Oct 19</span>
                            </div>
                        </span>
                    </div>
                    <div className="icon">
                        <img src='/assets/rainy.svg' />
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="panel"></div>
            </div>

        </div>
    )
}

export default Weather