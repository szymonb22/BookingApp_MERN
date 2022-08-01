import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseWithOptions } from 'date-fns/fp';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../componets/footer/Footer';
import Header from '../../componets/header/Header';
import MailList from '../../componets/mailList/MailList';
import Navbar from '../../componets/navbar/Navbar';
import Reserve from '../../componets/reserve/Reserve';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './hotel.css';

const Hotel = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/hotels/find/${id}`);
    const {user} =useContext(AuthContext)
    const navigate = useNavigate();
    const handleMove = (direction) => {
        let newSlideIndex;
        if (direction === "l") {
            newSlideIndex = slideIndex === 0 ? 5 : slideIndex - 1;
        } else {
            newSlideIndex = slideIndex === 5 ? 0 : slideIndex + 1;
        }
        setSlideIndex(newSlideIndex);
    }
    const handleOpen = (i) => {
        setSlideIndex(i);
        setOpen(true);
    }

    const { date, options } = useContext(SearchContext);

    const handleClick = () => {
        if(user){
            setOpenModal(true);
        }else{
            navigate("/login");
        }
    }
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    const days = dayDifference(date[0].endDate, date[0].startDate);

    // const photos = [
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    //     },
    //     {
    //         src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    //     },
    // ];

    return (
        <div>
            <Navbar />
            <Header type='list' />
            {loading ? "loading" : <div className="hotelContainer">
                {
                    open && (<div className="slider">
                        <FontAwesomeIcon className='close' onClick={() => setOpen(false)} icon={faCircleXmark} />
                        <FontAwesomeIcon className='arrow' icon={faCircleArrowLeft} onClick={() => handleMove("l")} />
                        <div className="sliderWrapper">
                            {/* <img src={photos[slideIndex].src} alt="" className="sliderImg" /> */}
                            <img src={data?.photos[slideIndex]} alt="" className="sliderImg" />
                        </div>
                        <FontAwesomeIcon className='arrow' icon={faCircleArrowRight} onClick={() => handleMove("p")} />

                    </div>)
                }
                <button className="bookNow">Reserve or Book Now!</button>
                <div className="hotelWrapper">
                    <button className="bookNow">Reserve or Book Now!</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location – {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className="hotelImages">
                        {data.photos?.map((photo, i) => (
                            <div className="hotelImgWrapper" key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={photo}
                                    alt=""
                                    className="hotelImg"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">
                                {data.desc}
                            </p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                Located in the real heart of Krakow, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                            </h2>
                            <button onClick={handleClick}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>}
            {openModal && <Reserve  setOpen={setOpenModal} hotelId={id}/>}
        </div>
    );
}

export default Hotel;