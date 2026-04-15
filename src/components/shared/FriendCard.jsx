import React from 'react';
import Link from 'next/link';
import friends from "../../friends.json";

const statusStyles = {
  overdue: "bg-red-100 text-red-700 border border-red-200",
  "almost due": "bg-amber-100 text-amber-700 border border-amber-200",
  "on-track": "bg-green-100 text-green-700 border border-green-200",
};

const statusLabel = {
  overdue: "Overdue",
  "almost due": "Almost Due",
  "on-track": "On-Track",
};

const FriendCard = () => {
  return (
    <div className="min-h-screen bg-base-300 p-4 sm:p-6 md:p-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Your Friends
      </h1>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {friends.map((friend) => (
          <Link href={`/friends/${friend.id}`} key={friend.id} className="block">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all duration-200 hover:-translate-y-1 h-full">
              
              <div className="avatar">
                <div className="w-16 sm:w-20 rounded-full ring ring-gray-100 ring-offset-2">
                  <img src={friend.picture} alt={friend.name} className="object-cover" />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
                  {friend.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {friend.days_since_contact}d ago
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-1">
                {friend.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-50 text-green-700 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className={`w-full sm:w-auto text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[friend.status]}`}>
                {statusLabel[friend.status]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FriendCard;