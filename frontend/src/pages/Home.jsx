import React, { useState, useEffect } from "react";
import { Loader, FormFields, Card } from "../components";
import { Link } from "react-router-dom";
import { africa1, telegram } from "../assets/index";


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    "https://dalle-hn3a.onrender.com/api/v1/post",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    setAllPosts(result.data.reverse());
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // set dynamic imgPerPage value according to screen size
    if (window.innerWidth <= 768) {
        var dynamicPerPage = 3;
    } else {
        dynamicPerPage = 6;
    }

    // implement pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(dynamicPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstRepo = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstRepo, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPosts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <section className="mx-auto">
            <div className="md:grid md:grid-cols-2 md:grid-flow-row md:gap-4 max-w-7xl mt-16 sm:p-8 px-4 py-8 m-auto bg-white">
                <div className="hero__text grid-col-1 flex flex-col"> <br />
                    <h1 className="text-text text-blue-800">GEOLOGIX</h1>
                    <p className="mt-2 text-text max-w-[520px] text-hero text-[15px]">
                    The GeoLogix Solutions project aims to revolutionize the logistics and delivery industry by combining state-of-the-art GPS and blockchain technology. Through an Ethereum-based decentralized application (dApp), drivers are automatically rewarded for geographical compliance within designated zones. Utilizing location-based smart contracts, the system ensures timely deliveries while maintaining transparency and reliability. With a focus on efficiency and performance, GeoLogix sets a new benchmark in tech-driven logistics solutions, enhancing driver incentives and improving overall service quality.
                    </p>
                    <br />
                    <div className="flex flex-row gap-4 m-4">
                    <Link
                        to="/create"
                        className="font-inter font-bold bg-blue-800 text-white px-2  rounded-md w-[100px]"
                    >
                        Smart Contract
                    </Link>
                    <Link
                        to="/add"
                        className="font-inter font-bold bg-blue-800 text-white px-2 py-1 rounded-md w-[100px]"
                    >
                        Add Device
                    </Link>
                    </div>
                </div>
            <div className="mt-16]">
                <img src={telegram} style={{ width: 500, height: 400 }} alt="img" className=""/>
            </div>
            </div>
        </section>
    );
};

export default Home;
