import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Vector from "../assets/Vector.png";

const Sidebar = ({
  tasks,
  selectedDate,
  setSelectedDate,
  selectedCategory,
  setSelectedCategory,
  setSelectedTask,
  setShowNewTask,
}) => {
  // Compare two dates only by year, month, day (ignore time completely)
  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Count tasks for the selected date
  const todayCount = tasks.filter((t) =>
    isSameDate(t.date, selectedDate)
  ).length;

  // Get unique tags for the sidebar
  const uniqueTags = [...new Set(tasks.flatMap((task) => task.tags))];

  return (
    <aside className="w-80 bg-white p-6 shadow-md overflow-y-auto border-r border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
          <img src={Vector} alt="Logo" className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Listify</h1>
      </div>

      <div className="mb-8">
        <Calendar
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedCategory(null);
            setSelectedTask(null);
            setShowNewTask(false);
          }}
          className="!border-none !p-4 text-gray-700"
          navigationLabel={({ label }) => (
            <span className="text-lg font-semibold">{label}</span>
          )}
          prev2Label={null}
          next2Label={null}
        />
      </div>

      <h2 className="text-md font-semibold text-gray-500 mb-2">Tasks</h2>
      <div
        className="flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 mb-6"
        onClick={() => {
          setSelectedCategory(null);
          setSelectedTask(null);
          setShowNewTask(false);
        }}
      >
        <span className="text-lg">Today</span>
        <span className="font-semibold text-gray-600">{todayCount}</span>
      </div>

      <h2 className="text-md font-semibold text-gray-500 mb-2">Lists</h2>
      <div className="space-y-2">
        {uniqueTags.map((tag) => (
          <div
            key={tag}
            className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
              selectedCategory === tag ? "bg-gray-200" : ""
            }`}
            onClick={() => {
              setSelectedCategory(tag);
              setSelectedTask(null);
              setShowNewTask(false);
            }}
          >
            <span className="text-lg">{tag}</span>
            <span className="font-semibold text-gray-600">
              {tasks.filter((t) => t.tags.includes(tag)).length}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
