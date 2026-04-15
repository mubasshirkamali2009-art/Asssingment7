"use client";
import React, { use, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import friendsData from "../../../friends.json";
import { HiMiniBellSnooze } from "react-icons/hi2";
import { AiFillDelete } from "react-icons/ai";
import { FaBoxArchive, FaVideo } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { IoIosText } from "react-icons/io";

const statusStyles = {
  "overdue": "bg-red-100 text-red-700",
  "on-track": "bg-green-100 text-green-700",
  "almost due": "bg-yellow-100 text-yellow-700",
};

const statusLabel = {
  "overdue": "Overdue",
  "on-track": "On Track",
  "almost due": "Almost Due",
};

const FriendDetailPage = ({ params }) => {
  const { id } = use(params);
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriend = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const foundFriend = friendsData.find((f) => String(f.id) === String(id));
      setFriend(foundFriend);
      setLoading(false);
    };
    fetchFriend();
  }, [id]);

  const addToTimeline = (type) => {
    if (!friend) return;
    const entry = {
      id: crypto.randomUUID(),
      name: friend.name,
      action: type,
      timestamp: new Date().toLocaleString()
    };
    const existingTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    existingTimeline.unshift(entry);
    localStorage.setItem("timeline", JSON.stringify(existingTimeline));
    window.dispatchEvent(new Event("timelineUpdated"));
    toast.success(`${type} with ${friend.name}!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-300 flex flex-col justify-center items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 border-r-blue-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
        </div>
        <p className="text-gray-400 text-sm animate-pulse">Loading friend details...</p>
      </div>
    );
  }

  if (!friend) return <div className="p-6 text-red-500 bg-base-300 min-h-screen">Friend not found.</div>;

  return (
    <div className="py-10 md:py-20 px-4 flex flex-col lg:flex-row gap-6 bg-base-300 items-center lg:items-start lg:justify-center min-h-screen">
      <div id="left-column" className="w-full max-w-md lg:w-[400px] space-y-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow duration-200">
          <div className="avatar">
            <div className="w-20 md:w-24 rounded-full ring ring-gray-100 ring-offset-2">
              <img src={friend.picture} alt={friend.name} />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">{friend.name}</h2>
          </div>
          <span className={`text-xs font-semibold px-4 py-1.5 rounded-full ${statusStyles[friend.status]}`}>
            {statusLabel[friend.status]}
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {friend.tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-100 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">{friend.bio}</p>
          <p className="text-gray-500 text-xs md:text-sm italic">{friend.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-3">
          <button className="btn w-full py-3 flex items-center justify-center gap-2"><HiMiniBellSnooze />Snooze</button>
          <button className="btn w-full py-3 flex items-center justify-center gap-2"><FaBoxArchive />Archive</button>
          <button className="btn w-full py-3 text-red-500 flex items-center justify-center gap-2"><AiFillDelete />Delete</button>
        </div>
      </div>

      <div id="right-column" className="w-full max-w-3xl space-y-6 lg:space-y-14">
        <div id="start-3cards" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className='rounded-xl bg-white text-center text-black shadow-lg p-6 md:p-8 font-bold'>
            <h2 className="text-xl md:text-2xl">{friend.days_since_contact}</h2>
            <p className='text-gray-500 text-sm font-medium'>Days Since Contact</p>
          </div>
          <div className='rounded-xl bg-white text-center text-black shadow-lg p-6 md:p-8 font-bold'>
            <h2 className="text-xl md:text-2xl">{friend.goal}</h2>
            <p className='text-gray-500 text-sm font-medium'>Goal(Days)</p>
          </div>
          <div className='rounded-xl bg-white text-center text-black shadow-lg p-6 md:p-8 font-bold'>
            <h2 className="text-lg md:text-xl truncate">{friend.next_due_date}</h2>
            <p className='text-gray-500 text-sm font-medium'>Next Due</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <p className="text-green-800 font-semibold">Relationship Goal</p>
            <button className="btn btn-sm btn-outline">Edit</button>
          </div>
          <p className="text-gray-700">Connect every <span className="font-extrabold text-lg">{friend.goal}</span> days</p>
        </div>

        <div className="bg-white space-y-6 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-green-800 font-semibold text-center sm:text-left">Quick Check-In</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={() => addToTimeline("Call")} className="btn btn-ghost bg-gray-50 border-gray-200 hover:bg-blue-50 py-4 flex flex-col sm:flex-row items-center gap-2 h-auto">
              <IoCallOutline className="text-xl text-blue-600" /> Call
            </button>
            <button onClick={() => addToTimeline("Text")} className="btn btn-ghost bg-gray-50 border-gray-200 hover:bg-green-50 py-4 flex flex-col sm:flex-row items-center gap-2 h-auto">
              <IoIosText className="text-xl text-green-600" /> Text
            </button>
            <button onClick={() => addToTimeline("Video")} className="btn btn-ghost bg-gray-50 border-gray-200 hover:bg-purple-50 py-4 flex flex-col sm:flex-row items-center gap-2 h-auto">
              <FaVideo className="text-xl text-purple-600" /> Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetailPage;