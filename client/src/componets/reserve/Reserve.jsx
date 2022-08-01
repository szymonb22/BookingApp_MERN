import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import "./reserve.css"
const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`hotels/room/${hotelId}`)
    const { date } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        let list = [];

        while (date <= end) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return list;
    }

    const allDates = getDatesInRange(date[0].startDate, date[0].endDate)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unvailableDates.some((date) => allDates.includes(new Date(date).getTime()))
        return !isFound;
    }
    const navigate = useNavigate();
    const handleClick = async() => {
        try {
            await Promise.all(selectedRooms.map((roomId)=>{
                const res = axios.put(`/rooms/availability/${roomId}`, {
                    dates: allDates,
                  });
                  return res.data
            }))
            setOpen(false);
            navigate('/');
        } catch (error) {
            
        }
    }

    const handleSelect = (e) => {
        const checked = e.target.chcecked
        const values = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, values] : selectedRooms.filter(item => item !== values))
    }
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={(() => setOpen(false))} />
            </div>
            <span>Select your rooms:</span>
            {data.map(item => (
                <div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">Max people: <b>{item.maxPeople} </b></div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectRooms">
                        {item.roomNumber.map((roomNumber) => (
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input
                                    disabled={!isAvailable(roomNumber)}
                                    type="checkbox" value={roomNumber._id} onChange={handleSelect} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleClick} className="rButton">
                Reserve Now!
            </button>
        </div>
    );
}

export default Reserve;
