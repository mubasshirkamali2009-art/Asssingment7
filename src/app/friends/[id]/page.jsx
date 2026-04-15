"use client"; 
import React, { use, useState, useEffect } from 'react'; // Added useState, useEffect
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import friendsData from "../../../friends.json"; // Renamed to avoid state conflict
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
      // Force minimum 0.5s delay
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

  // Loading State with your specific Spinner
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
    <div className="py-20 flex gap-6 bg-base-300 justify-center min-h-screen">
      <div id="laft-column" className="w-[400px] gap-10 ">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow duration-200">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-gray-100 ring-offset-2">
              <img src={friend.picture} alt={friend.name} />
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-800">{friend.name}</h2>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[friend.status]}`}>
            {statusLabel[friend.status]}
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {friend.tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-100 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-s ">{friend.bio}</p>
          <p className="text-gray-500 text-xs">{friend.email}</p>
        </div>

        <div className="flex flex-col gap-5 my-5">
          <button className="btn px-15 py-3"><HiMiniBellSnooze />Snooze 2 weeks</button>
          <button className="btn px-15 py-3"><FaBoxArchive />Archive</button>
          <button className="btn px-15 py-3 text-red-500"><AiFillDelete />Delete</button>
        </div>
      </div>

      <div id="right-coloumn" className="space-y-14">
        <div id="start-3cards" className="flex gap-5 ">
          <div className='rounded-md bg-white text-center text-black shadow-2xl p-8 font-bold w-[240px]'>
            <h2>{friend.days_since_contact}</h2>
            <p className='text-gray-500'>Days Since Contact</p>
          </div>
          <div className='rounded-md bg-white text-center text-black shadow-2xl p-8 w-[240px] font-bold'>
            <h2>{friend.goal}</h2>
            <p className='text-gray-500'>Goal(Days)</p>
          </div>
          <div className='rounded-md bg-white text-center text-black shadow-2xl p-8 w-[240px] font-bold'>
            <h2>{friend.next_due_date}</h2>
            <p className='text-gray-500'>Next Due</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <div className="flex justify-between">
            <p className="text-green-800">Relationship Goal</p>
            <button className="btn btn--outline">Edit</button>
          </div>
          Connect every <span className="font-extrabold">{friend.goal}</span>
        </div>

        <div className="bg-white space-y-5 p-5 rounded-xl">
          <p className="text-green-800">Quick Check-In</p>
          <div className="flex gap-9 justify-center">
            <button onClick={() => addToTimeline("Call")} className="btn btn-base px-14 py-5">
              <IoCallOutline /> Call
            </button>
            <button onClick={() => addToTimeline("Text")} className="btn btn-base px-14 py-5">
              <IoIosText /> Text
            </button>
            <button onClick={() => addToTimeline("Video")} className="btn btn-base px-14 py-5">
              <FaVideo /> Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetailPage;