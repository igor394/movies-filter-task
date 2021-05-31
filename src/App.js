import {useCallback, useEffect, useState} from "react";
import "./App.css";
import dataBase from "../src/data.json";

const fetchedMovies = dataBase;

const getFilterArrOptions = (objParam) => {
    return Object.entries(objParam)
        .filter(([key, value]) => value)
        .map((item) => item[0]);
};

const getFilterMap = (stateObj) => {
    const res = {...stateObj};
    for (let el in res) {
        if (typeof res[el] === "object") {
            res[el] = getFilterArrOptions(res[el]);
        }
    }
    return res;
};

const initialFilterOptions = {
    title: "",
    rating: {},
    category: {},
};

function App() {
    const [displayedMovies, setDisplayedMovies] = useState([]);
    const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
    const [isRatingSectionOpen, setIsRatingSectionOpen] = useState(false);
    const [isGenreSectionOpen, setIsGenreSectionOpen] = useState(false);

    useEffect(() => {
        const filters = getFilterMap(filterOptions);
        setDisplayedMovies(filterMovies(fetchedMovies, filters));
    }, [filterOptions]);

    const filterMovies = (arr, filters) => {
        const filterKeys = Object.keys(filters);
        //Do not display any movies when all filters inactive
        if (
            !filters.title &&
            filters.category.length === 0 &&
            filters.rating.length === 0
        ) {
            return [];
        }

        return arr.filter((eachObj) => {
            return filterKeys.every((eachKey) => {
                if (!filters[eachKey].length || filters[eachKey].includes("any")) {

                    return true; // passing an empty filter means that filter is ignored.
                }
                if (eachKey === "rating") {

                    return filters[eachKey].includes(
                        String(Math.trunc(eachObj[eachKey]))
                    );
                }
                if (eachKey === "title") {
                    return eachObj[eachKey]
                        .toLowerCase()
                        .includes(filters[eachKey].toLowerCase());
                }
                return filters[eachKey].includes(eachObj[eachKey]);
            });
        });
    };

    const ratingOutput = useCallback((params) => {
        let filled = Array(Math.floor(params))
            .fill('<img src="/images/star-filled.svg" alt="arrow"/>')
            .join("");
        let empty = Array(10 - Math.ceil(params))
            .fill('<img src="/images/star.svg" alt="arrow"/>')
            .join("");
        let half = Array(1)
            .fill('<img src="/images/half-star.svg" alt="arrow" class="half-star"/>')
            .join("");
        switch (params % 1) {
            case 0:
                return filled + empty;
            default:
                return filled + half + empty;
        }
    }, []);

    const onchangeTitleHandler = (e) => {
        const {value} = e.target;
        setFilterOptions({
            ...filterOptions,
            title: value,
        });
    };

    const onchangeRatingHandler = (e) => {
        const {name, checked} = e.target;
        setFilterOptions({
            ...filterOptions,
            rating: {...filterOptions.rating, [name]: checked},
        });
    };

    const onchangeGenreHandler = (e) => {
        const {name, checked} = e.target;
        setFilterOptions({
            ...filterOptions,
            category: {...filterOptions.category, [name]: checked},
        });
    };

    const openRatingSectionHandler = () => {
        if (!isRatingSectionOpen) setIsGenreSectionOpen(false);
        setIsRatingSectionOpen(!isRatingSectionOpen);
    };

    const openGenreSectionHandler = () => {
        if (!isGenreSectionOpen) setIsRatingSectionOpen(false);
        setIsGenreSectionOpen(!isGenreSectionOpen);
    };

    return (
        <div className="App">
            <div className="search-collum">
                <div className="search">
                    <input
                        onChange={onchangeTitleHandler}
                        value={filterOptions.title}
                        type="text"
                        className="input"
                        placeholder="Enter movie name"
                    />
                </div>
                {displayedMovies.length > 0 && (
                    <div className="search-result">
                        {displayedMovies.map((item, index) => (
                            <div key={index - item.rating} className="item-result">
                                <div className="result-text">
                                    <span>{item.title}</span>
                                    <span>{item.category}</span>
                                </div>
                                <div
                                    className="result-rating"
                                    dangerouslySetInnerHTML={{
                                        __html: ratingOutput(item.rating),
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="rating-collum">
                <div className="selected" onClick={openRatingSectionHandler}>
                    <span>Rating</span>
                    {isRatingSectionOpen ? (
                        <img src="/images/chevron-up.svg" alt="arrow"/>
                    ) : (
                        <img src="/images/chevron-down.svg" alt="arrow"/>
                    )}
                </div>
                {isRatingSectionOpen && (
                    <div className="rating">
                        <div>
                            <label>
                                <input
                                    className="checkbox"
                                    onChange={onchangeRatingHandler}
                                    name="any"
                                    checked={filterOptions.rating["any"] || false}
                                    type="checkbox"
                                />
                                <span>Any rating</span>
                            </label>
                        </div>
                        <div id="1">
                            <label>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    onChange={onchangeRatingHandler}
                                    name="1"
                                    checked={filterOptions.rating["1"] || false}
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(1)}}
                                ></span>
                            </label>
                        </div>
                        <div id="2">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="2"
                                    checked={filterOptions.rating["2"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(2)}}
                                ></span>
                            </label>
                        </div>
                        <div id="3">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="3"
                                    checked={filterOptions.rating["3"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(3)}}
                                ></span>
                            </label>
                        </div>
                        <div id="4">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="4"
                                    checked={filterOptions.rating["4"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(4)}}
                                ></span>
                            </label>
                        </div>
                        <div id="5">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="5"
                                    checked={filterOptions.rating["5"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(5)}}
                                ></span>
                            </label>
                        </div>
                        <div id="6">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="6"
                                    checked={filterOptions.rating["6"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(6)}}
                                ></span>
                            </label>
                        </div>
                        <div id="7">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="7"
                                    checked={filterOptions.rating["7"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(7)}}
                                ></span>
                            </label>
                        </div>
                        <div id="8">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="8"
                                    checked={filterOptions.rating["8"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(8)}}
                                ></span>
                            </label>
                        </div>
                        <div id="9">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="9"
                                    checked={filterOptions.rating["9"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(9)}}
                                ></span>
                            </label>
                        </div>
                        <div id="10">
                            <label>
                                <input
                                    onChange={onchangeRatingHandler}
                                    name="10"
                                    checked={filterOptions.rating["10"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span
                                    dangerouslySetInnerHTML={{__html: ratingOutput(10)}}
                                ></span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            <div className="genre-collum">
                <div className="selected" onClick={openGenreSectionHandler}>
                    <span>Genre</span>
                    {isGenreSectionOpen ? (
                        <img src="/images/chevron-up.svg" alt="arrow"/>
                    ) : (
                        <img src="/images/chevron-down.svg" alt="arrow"/>
                    )}
                </div>
                {isGenreSectionOpen && (
                    <div className="genre">
                        <div>
                            <label>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    onChange={onchangeGenreHandler}
                                    name="any"
                                    checked={filterOptions.category["any"] || false}
                                />
                                <span>Any genre</span>
                            </label>
                        </div>
                        <div id="Action">
                            <label>
                                <input
                                    onChange={onchangeGenreHandler}
                                    name="Action"
                                    checked={filterOptions.category["Action"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span>Action</span>
                            </label>
                        </div>
                        <div id="Comedy">
                            <label>
                                <input
                                    onChange={onchangeGenreHandler}
                                    name="Comedy"
                                    checked={filterOptions.category["Comedy"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span>Comedy</span>
                            </label>
                        </div>
                        <div id="Drama">
                            <label>
                                <input
                                    onChange={onchangeGenreHandler}
                                    name="Drama"
                                    checked={filterOptions.category["Drama"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span>Drama</span>
                            </label>
                        </div>
                        <div id="Thriller">
                            <label>
                                <input
                                    onChange={onchangeGenreHandler}
                                    name="Thriller"
                                    checked={filterOptions.category["Thriller"] || false}
                                    className="checkbox"
                                    type="checkbox"
                                />
                                <span>Thriller</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;