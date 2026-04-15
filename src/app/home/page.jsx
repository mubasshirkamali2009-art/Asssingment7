"use client"; // Required for useState and useEffect
import FriendCard from '@/components/shared/FriendCard';
import React, { useState, useEffect } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import friendsData from "../../friends.json";
import Link from 'next/link';

const HomePage = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            // Simulate network delay of 0.5s
            await new Promise(resolve => setTimeout(resolve, 500));
            setFriends(friendsData);
            setLoading(false);
        };

        fetchFriends();
    }, []);

    return (
        <div className='bg-base-300 min-h-screen'>
            <div className='mx-auto mt-30 content-center bg-base-300 items-center text-center'>
                <h1 className='text-black bg-base-300 text-5xl py-5 text-center font-bold'>Friends to keep close in your life</h1>
                <p className='text-center text-gray-500 py-5 '>
                    Your personal shelf of meaningful connections. <br /> Browse, tend, and nurture the relationships that matter most.
                </p>
                <button className='btn text-white bg-green-900 mx-auto content-center items-center'>
                    <IoAddCircleOutline /> Add Friend
                </button>
            </div>

            <div className='flex gap-10 p-10 mx-auto my-20 justify-center'>
                <div className='rounded-md bg-white text-center text-black shadow-2xl p-8 font-bold'>
                    <h2>{friends.length}</h2>
                    <p className='text-gray-500'>Total friends</p>
                </div>
                <div className='rounded-md bg-white text-center text-black shadow-2xl p-8 font-bold '>
                    <h2>{friends.filter(f => f.status === 'on-track').length}</h2>
                    <p className='text-gray-500'>On Track</p>
                </div>
                <div className='rounded-md bg-white text-center text-black shadow-2xl p-8 font-bold'>
                    <h2>{friends.filter(f => f.status === 'overdue').length}</h2>
                    <p className='text-gray-500'>Need Attention</p>
                </div>
                <div className='rounded-md bg-white text-center text-black shadow-2xl p-8 font-bold'>
                    <h2>10</h2>
                    <p className='text-gray-500'>Interactions This Month</p>
                </div>
            </div>

            <div>
                {loading ? (
                    /* The Spinner logic from your Timeline page */
                    <div className="flex flex-col justify-center items-center py-20 gap-4">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400 animate-spin"></div>
                            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 border-r-blue-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
                        </div>
                        <p className="text-gray-400 text-sm animate-pulse">Fetching friends...</p>
                    </div>
                ) : (
                    <FriendCard />
                )}
            </div>
        </div>
    );
};

export default HomePage;