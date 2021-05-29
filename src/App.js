import {useCallback, useEffect, useState} from "react";
import './App.css';
import dataBase from '../src/data.json'

function App() {
    const [isAll, setIsAll] = useState()
    const [isRating, setIsRating] = useState(false)
    const [isGenre, setIsGenre] = useState(false)
    const [array, setArray] = useState([])
    const [name, setName] = useState('')
    const [rating, setRating] = useState([])
    const [genre, setGenre] = useState([])


    useEffect(() => {
        if (isAll) {
            setArray(dataBase);
            return true
        }
        if (name.length !== 0 && rating.length !== 0 && genre.length === 0) {
            setArray((dataBase.filter(item => item.title.toLowerCase().includes(name))).filter(obj => rating.includes(Math.floor(obj.rating))));
            return true;
        }
        if (name.length !== 0 && genre.length !== 0 && rating.length === 0) {
            setArray((dataBase.filter(item => item.title.toLowerCase().includes(name))).filter(obj => genre.includes(obj.category)));
            return true;
        }
        if (name.length !== 0 && rating.length === 0 && genre.length === 0) {
            setArray(dataBase.filter(item => item.title.toLowerCase().includes(name)))
            return true
        }
        if (name.length === 0 && rating.length !== 0 && genre.length === 0) {
            setArray(dataBase.filter(obj => rating.includes(Math.floor(obj.rating))));
            return true
        }
        if (name.length === 0 && rating.length === 0 && genre.length !== 0) {
            setArray(dataBase.filter(obj => genre.includes(obj.category)));
            return true
        }
        if (name.length === 0 && rating.length === 0 && genre.length === 0) {
            setArray([]);
        }
    }, [name, rating, genre])
    const searchHandler = useCallback((event) => {
        let params = event.target.value.toLowerCase();
        if (params === '') {
            setName('');
            return false;
        }
        setName(params)
    }, [])
    const ratingOutput = useCallback((params) => {
        let filled = Array(Math.floor(params)).fill('<img src="/images/star-filled.svg" alt="arrow"/>').join('')
        let empty = Array(10 - Math.ceil(params)).fill('<img src="/images/star.svg" alt="arrow"/>').join('')
        let half = Array(1).fill('<img src="/images/half-star.svg" alt="arrow" class="half-star"/>').join('')
        switch (params % 1) {
            case 0:
                return filled + empty
            default:
                return filled + half + empty
        }
    }, [])
    const genreHandler = () => {
        setIsRating(false)
        setRating([])
        setIsGenre(previous => !previous)
        if (isGenre) setGenre([])
    }
    const ratingHandler = () => {
        setIsGenre(false)
        setGenre([])
        setIsRating(previous => !previous)
        if (isRating) setRating([])
    }
    const checkboxRatingHandler = (event) => {
        let checked = event.target.checked;
        let id = event.currentTarget.id
        const filter = rating.filter(item => item !== +id)
        switch (checked) {
            case true:
                setRating([...filter, +id])
                break;
            case false:
                setRating(filter)
                break;
            default:
                return rating
        }
    }
    const checkboxGenreHandler = (event) => {
        let checked = event.target.checked;
        let id = event.currentTarget.id
        const filter = genre.filter(item => item !== id)
        switch (checked) {
            case true:
                setGenre([...filter, id])
                break;
            case false:
                setGenre(filter)
                break;
            default:
                return genre
        }
    }
    const handlerAny = () => {
        setIsAll(previous => !previous)
    }

    return (
        <div className="App">
            <div className='search-collum'>
                <div className='search'>
                    <input type='text' className='input' placeholder='Enter movie name' onChange={searchHandler}/>
                </div>
                {array.length > 0 && <div className='search-result'>
                    {array.map((item, index) =>
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
                    <div onClick={handlerAny}>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span>Any rating</span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='1'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(1)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='2'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(2)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='3'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(3)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='4'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(4)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='5'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(5)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='6'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(6)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='7'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(7)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='8'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(8)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='9'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(9)}}></span>
                        </label>
                    </div>
                    <div onClick={checkboxRatingHandler} id='10'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span dangerouslySetInnerHTML={{__html: ratingOutput(10)}}></span>
                        </label>
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
                    <div onClick={handlerAny}>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span>Any genre</span>
                        </label>
                    </div>
                    <div onClick={checkboxGenreHandler} id='Action'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span>Action</span>
                        </label>
                    </div>
                    <div onClick={checkboxGenreHandler} id='Comedy'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span>Comedy</span>
                        </label>
                    </div>
                    <div onClick={checkboxGenreHandler} id='Drama'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span>Drama</span>
                        </label>
                    </div>
                    <div onClick={checkboxGenreHandler} id='Thriller'>
                        <label>
                            <input className='checkbox' type="checkbox"/>
                            <span>Thriller</span>
                        </label>
                    </div>

                </div>}
            </div>
        </div>
    );
}

export default App;
