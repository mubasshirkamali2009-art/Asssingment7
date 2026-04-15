"use client";
import { useState, useEffect } from "react";
import callimg from "../../assets/img/call.png"
import textimg from "../../assets/img/text.png"
import videoimg from "../../assets/img/video.png"
import Image from "next/image";

const icons = {
  Call: <Image src={callimg} alt="call history"/>,
  Text: <Image src={textimg} alt="text history"/>,
  Video: <Image src={videoimg} alt="video history" />,
};

const colors = {
  Call: "bg-blue-50 text-blue-600",
  Text: "bg-green-50 text-green-600",
  Video: "bg-purple-50 text-purple-600",
};

const filterOptions = ["All", "Call", "Text", "Video"];

const TimelinePage = () => {
  const [allActivity, setAllActivity] = useState([]);
  const [selected, setSelected] = useState("All");

  useEffect(() => {
    const load = () => {
      const saved = JSON.parse(localStorage.getItem("timeline") || "[]");
      setAllActivity(saved);
    };

    load();

    window.addEventListener("timelineUpdated", load);
    return () => window.removeEventListener("timelineUpdated", load);
  }, []);

  const visibleActivity = selected === "All"
    ? allActivity
    : allActivity.filter((item) => item.action === selected);

  return (
    <div className="min-h-screen bg-base-300 py-20 px-6">
      <div className="max-w-3xl mx-auto w-full">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Timeline</h1>

        <div className="relative inline-block mb-8">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-9 text-sm text-gray-700 cursor-pointer focus:outline-none focus:border-gray-400 min-w-[160px]"
          >
            <option value="All">Filter timeline</option>
            {filterOptions.filter((o) => o !== "All").map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="12" height="12" viewBox="0 0 12 12" fill="none"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {visibleActivity.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-400 text-lg">No activity yet</p>
            <p className="text-gray-300 text-sm mt-2">Go check in with a friend!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleActivity.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5 hover:shadow-xl hover:scale-[1.15] transition-all duration-500 ease-in-out cursor-pointer w-full"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors[item.action]}`}>
                  {icons[item.action]}
                </div>

                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">
                    {item.action}
                    <span className="text-gray-400 font-normal"> with </span>
                    {item.name}
                  </p>
                  <p className="text-gray-400 text-sm mt-0.5">{item.timestamp}</p>
                </div>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors[item.action]}`}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default TimelinePage;