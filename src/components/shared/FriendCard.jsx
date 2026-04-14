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
    <div className="min-h-screen bg-base-300 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Friends</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <Link href={`/friends/${friend.id}`} key={friend.id}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow duration-200">
              
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-gray-100 ring-offset-2">
                  <img src={friend.picture} alt={friend.name} />
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-800">{friend.name}</h2>
                <p className="text-sm text-gray-400 mt-0.5">{friend.days_since_contact}d ago</p>
              </div>

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

              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[friend.status]}`}>
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