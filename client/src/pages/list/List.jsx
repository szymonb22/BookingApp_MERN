import { format } from 'date-fns';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import Header from '../../componets/header/Header';
import Navbar from '../../componets/navbar/Navbar';
import SearchItem from '../../componets/searchItem/SearchItem';
import './list.css';
import useFetch from '../../hooks/useFetch';

const List = () => {

    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    
    const { data, loading, error,reFetch } = useFetch(`/hotels?city=${destination}&min=${min||0}&max=${max||999 }`);
    

    const handleClick=()=>{
     reFetch()
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")}`} to {`${format(date[0].endDate, "dd/MM/yyyy")}`} </span>
                            {openDate && (<DateRange
                                onChange={item => setDate([item.selection])}
                                minDate={new Date()}
                                ranges={date}

                            />)}
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input onChange={e=>setMin(e.target.value)} type="number" className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input onChange={e=>setMax(e.target.value)}  type="number" className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Adult
                                    </span>
                                    <input type="number" min={1} placeholder={options.adult} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Children
                                    </span>
                                    <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Room
                                    </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading?"loading":(
                            <>
                            {data.map((item)=>(
                                <SearchItem key={item._id} item={item} />

                            ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
//1.13.41