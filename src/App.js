import {useCallback, useState} from "react";
import './App.css';
import dataBase from '../src/data.json'

function App() {
    const [isRating, setIsRating] = useState(false)
    const [isGenre, setIsGenre] = useState(false)
    const [searchArray, setSearchArray] = useState([])
    const [rating, setRating] = useState(0)
    const [genre, setGenre] = useState('')
    const searchHandler = useCallback((event) => {
        let params = event.target.value.toLowerCase();
        if (params === '') {
            setSearchArray([]);
            return false;
        }
        setSearchArray(dataBase.filter(item => item.title.toLowerCase().includes(params)))
    }, [])
    const ratingOutput = (params) => {
        let filled = Array(Math.floor(params)).fill('<img src="/images/star-filled.svg" alt="arrow"/>').join('')
        let empty = Array(10 - Math.ceil(params)).fill('<img src="/images/star.svg" alt="arrow"/>').join('')
        let half = Array(1).fill('<img src="/images/half-star.svg" alt="arrow" class="half-star"/>').join('')
        switch (params % 1) {
            case 0:
                return filled + empty
            default:
                return filled + half + empty
        }
    }
    const genreHandler = () => {
        setIsGenre(previous => !previous)

    }
    const ratingHandler = () => {
        setIsRating(previous => !previous)
    }
    const checkboxHandler = (event) =>{
const array = document.querySelectorAll('.checkbox')
    }
    return (
        <div className="App">
            <div className='search-collum'>
                <div className='search'>
                    <input type='text' className='input' placeholder='Enter movie name' onChange={searchHandler}/>
                </div>
                {searchArray.length > 0 && <div className='search-result'>
                    {searchArray.map((item, index) =>
                        <div key={index - item.rating} className='item-result'>
                            <div className='result-text'>
                                <span>{item.title}</span>
                                <span>{item.category}</span>
                            </div>
                            <div className='result-rating'
                                 dangerouslySetInnerHTML={{__html: ratingOutput(item.rating)}}></div>
                        </div>)}
                </div>}
            </div>

            <div className='rating-collum'>
                <div className='selected' onClick={ratingHandler}>
                    <span>Rating</span>
                    {isRating ? <img src="/images/chevron-up.svg" alt="arrow"/> :
                        <img src="/images/chevron-down.svg" alt="arrow"/>}
                </div>
                {isRating && <div className='rating'>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='0' type="radio"  multiple/>
                        <div>
                            Any rating
                        </div>
                    </div>

                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='1' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(1)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='2' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(2)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='3' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(3)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='4' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(4)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='5' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(5)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='6' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(6)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='7' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(7)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='8' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(8)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='9' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(9)}}></div>
                    </div>
                    <div onClick={checkboxHandler}>
                        <input className='checkbox' name='rating' id='10' type="radio"/>
                        <div dangerouslySetInnerHTML={{__html: ratingOutput(10)}}></div>
                    </div>


                </div>}
            </div>

            <div className='genre-collum'>
                <div className='selected' onClick={genreHandler}>
                    <span>Genre</span>
                    {isGenre ? <img src="/images/chevron-up.svg" alt="arrow"/> :
                        <img src="/images/chevron-down.svg" alt="arrow"/>}
                </div>
                {isGenre && <div className='genre'>

                </div>}
            </div>
        </div>
    );
}

export default App;
