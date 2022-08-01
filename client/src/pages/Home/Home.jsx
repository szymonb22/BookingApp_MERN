import React from 'react';
import Featured from '../../componets/featured/Featured';
import FeaturedProperties from '../../componets/featuredProperties/FeaturedProperties';
import Footer from '../../componets/footer/Footer';
import Header from '../../componets/header/Header';
import MailList from '../../componets/mailList/MailList';
import Navbar from '../../componets/navbar/Navbar';
import PropertyList from '../../componets/propertyList/PropertyList';
import "./home.css";
const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">
                    Browse by property type
                </h1>
                <PropertyList />
                <h1 className="homeTitle">
                    Homes guests love
                </h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    );
}

export default Home;
