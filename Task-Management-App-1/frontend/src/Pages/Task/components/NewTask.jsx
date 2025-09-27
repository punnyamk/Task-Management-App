import React, { useState } from "react";
import { Check } from "lucide-react";
import api from "../../../server/api";

const colors = [
  "bg-[rgba(237,234,234,1)]",
  "bg-[rgba(168,23,192,0.6)]",
  "bg-[rgba(255,192,159,0.6)]",
  "bg-[rgba(176,255,250,0.6)]",
  "bg-[rgba(252,255,82,0.94)]",
  "bg-[rgba(78,255,49,1)]",
  "bg-[rgba(91,255,216,0.99)]",
  "bg-[rgba(0,56,255,0.6)]",
  "bg-[rgba(98,43,255,0.6)]",
  "bg-[rgba(210,29,255,0.85)]",
  "bg-[rgba(185,35,80,0.6)]",
  "bg-[rgba(255,0,0,1)]",
  "bg-[rgba(233,227,232,0.6)]",
];

const DayButton = ({ day, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
      isSelected
        ? "bg-white-600 text-black"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`}
  >
    {day}
  </button>
);

function NewTask({ setShowNewTask, fetchTasks }) {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [tags, setTags] = useState([]);
  const [taskDate, setTaskDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [repeat, setRepeat] = useState("Daily");
  const [selectedDays, setSelectedDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const [repeatInterval, setRepeatInterval] = useState("Every Week");

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const availableTags = ["Daily Routine", "Study Routine", "Work"];

  const handleSave = async () => {
    if (!taskName) return;

    const newTask = {
      title: taskName,
      desc: taskDesc,
      color: selectedColor,
      tags: tags.length ? tags : ["No Tag"],
      date: taskDate,
      repeat,
      repeatDays: selectedDays,
      repeatInterval,
    };

    try {
      const token = localStorage.getItem("token");
      await api.post("/tasks", newTask, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      fetchTasks();
      setTaskName("");
      setTaskDesc("");
      setSelectedColor(colors[0]);
      setTags([]);
      setTaskDate(new Date().toISOString().slice(0, 10));
      setRepeat("Daily");
      setSelectedDays(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
      setRepeatInterval("Every Week");
      setShowNewTask(false);
    } catch (err) {
      console.error(
        "Failed to save task:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-900 p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold mr-3">New Task</h2>
        <div
          add_reaction
          className="bg--500 w-6 h-6 rounded-full flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Task Name & Description */}
      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Name your new task"
          className="w-full p-4 text-lg border-b border-gray-300 bg-gray-50 text-black-900 focus:outline-none focus:border-gray-500"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Describe your new task"
          className="w-full p-4 border-b border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:border-blue-500"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />
      </div>

      {/* Card Color */}
      <div className="mb-10">
        <h3 className="font-semibold text-gray-600 mb-4">Card Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer transition-transform ${color} ${
                selectedColor === color
                  ? "border-4 border-[#EDEAEA]"
                  : "hover:scale-105"
              }`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Repeat + Tags */}
      <div
        className="mb-10 p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between gap-6 bg-[rgba(248,249,250,0.8)]
"
      >
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <h3 className="font-semibold text-gray-600 mb-2">Repeat</h3>
          <p className="text-gray-500 mb-2">Set a cycle for your task</p> <hr />
          <div className="flex flex-wrap gap-2">
            {["Daily", "Weekly", "Monthly"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  repeat === option
                    ? "bg-gray-200 text-black shadow-lg"
                    : "bg-white-180 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => setRepeat(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {(repeat === "Weekly" || repeat === "Daily") && (
            <div className="flex gap-2 mt-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <DayButton
                  key={day}
                  day={day.slice(0, 1)}
                  isSelected={selectedDays.includes(day)}
                  onClick={() => toggleDay(day)}
                />
              ))}
            </div>
          )}
          <div className="flex items-center mt-2">
            <p className="text-gray-500 mr-2">Repeat Interval</p>
            <select
              value={repeatInterval}
              onChange={(e) => setRepeatInterval(e.target.value)}
              className="bg-gray-200 border-none text-gray-700 py-2 px-4 rounded-lg focus:outline-none"
            >
              <option value="Every Week">Every Week</option>
              <option value="Every Two Weeks">Every Two Weeks</option>
              <option value="Every Month">Every Month</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <h3 className="font-semibold text-gray-600 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium transition-colors ${
                  tags.includes(tag)
                    ? "bg-white-600 text-black shadow-lg"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() =>
                  setTags(
                    tags.includes(tag)
                      ? tags.filter((t) => t !== tag)
                      : [...tags, tag]
                  )
                }
              >
                {tag}
              </span>
            ))}
            <span
              className="px-3 py-1 rounded-full cursor-pointer text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => alert("Add more tags logic")}
            >
              Add More +
            </span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button
          className="bg-[rgba(221, 226, 231, 1) w-16 h-16 rounded-full flex items-center justify-center text-black text-3xl shadow-2xl hover:bg-gray-200 transition"
          onClick={handleSave}
        >
          <Check className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default NewTask;
