"use client";
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
            await new Promise(resolve => setTimeout(resolve, 500));
            setFriends(friendsData);
            setLoading(false);
        };

        fetchFriends();
    }, []);

    return (
        <div className='bg-base-300 min-h-screen px-4 md:px-8'>
            <div className='mx-auto pt-10 md:pt-20 text-center max-w-4xl'>
                <h1 className='text-black text-3xl md:text-5xl lg:text-6xl py-5 font-bold leading-tight'>
                    Friends to keep close in your life
                </h1>
                <p className='text-gray-500 py-5 text-sm md:text-base lg:text-lg'>
                    Your personal shelf of meaningful connections. <br className="hidden md:block" /> Browse, tend, and nurture the relationships that matter most.
                </p>
                <button className='btn text-white bg-green-900 mx-auto flex items-center gap-2 hover:bg-green-800 transition-colors'>
                    <IoAddCircleOutline className="text-xl" /> Add Friend
                </button>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 p-5 md:p-10 mx-auto my-10 max-w-6xl'>
                <div className='rounded-xl bg-white text-center text-black shadow-lg p-4 md:p-8 font-bold'>
                    <h2 className="text-xl md:text-2xl">{friends.length}</h2>
                    <p className='text-gray-500 text-xs md:text-sm font-normal'>Total friends</p>
                </div>
                <div className='rounded-xl bg-white text-center text-black shadow-lg p-4 md:p-8 font-bold'>
                    <h2 className="text-xl md:text-2xl">{friends.filter(f => f.status === 'on-track').length}</h2>
                    <p className='text-gray-500 text-xs md:text-sm font-normal'>On Track</p>
                </div>
                <div className='rounded-xl bg-white text-center text-black shadow-lg p-4 md:p-8 font-bold'>
                    <h2 className="text-xl md:text-2xl">{friends.filter(f => f.status === 'overdue').length}</h2>
                    <p className='text-gray-500 text-xs md:text-sm font-normal'>Need Attention</p>
                </div>
                <div className='rounded-xl bg-white text-center text-black shadow-lg p-4 md:p-8 font-bold'>
                    <h2 className="text-xl md:text-2xl">10</h2>
                    <p className='text-gray-500 text-xs md:text-sm font-normal'>Interactions</p>
                </div>
            </div>

            <div className="pb-20">
                {loading ? (
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