import React, { useContext, useState } from 'react';
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const { dispatch } = useContext(SearchContext);
    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const navigate = useNavigate()

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } })
        navigate('/hotels', { state: { destination, date, options } })
    }
    const { user } = useContext(AuthContext);


    return (
        <div className='header'>
            <div className={type === "list" ? "headerContainer listModel" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Aiport taxis</span>
                    </div>
                </div>
                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant savings of 10% or
                            more with a free Lamabooking account
                        </p>
                        {!user&&<button className='headerBtn'>Sign in / Register</button>}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input type="text"
                                    onChange={e => setDestination(e.target.value)}
                                    placeholder='Where are you going' className='headerSearchInput' />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "dd/MM/yyyy")}`} to {`${format(date[0].endDate, "dd/MM/yyyy")}`} </span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    minDate={new Date()}
                                    className="date"
                                />
                                }
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                                {openOptions && <div className="options">
                                    <div className="optionsItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionsCounter">
                                            <button className="optionsCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionsCounterNumber">{options.adult}</span>
                                            <button className="optionsCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionsCounter">
                                            <button className="optionsCounterButton" disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionsCounterNumber">{options.children}</span>
                                            <button className="optionsCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionsCounter">
                                            <button className="optionsCounterButton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionsCounterNumber">{options.room}</span>
                                            <button className="optionsCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            <div className="headerSearchItem">
                                <button onClick={handleSearch} className='headerBtn'>Search</button>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    );
}

export default Header;
