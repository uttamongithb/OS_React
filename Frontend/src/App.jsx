import { useState, useEffect } from "react";
import { FaWifi, FaBatteryFull, FaVolumeUp, FaFolder } from "react-icons/fa";
import { BsCircle } from "react-icons/bs";

export default function App() {
  const [time, setTime] = useState("");
  const [showWifi, setShowWifi] = useState(false);
  const [showBattery, setShowBattery] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [folders, setFolders] = useState([
    { name: "Portfolio", color: "bg-blue-600" },
    { name: "React App", color: "bg-green-600" },
    { name: "Docs", color: "bg-purple-600" },
    { name: "Todo", color: "bg-orange-600" },
  ]);
  const [openApp, setOpenApp] = useState(null); // dock apps

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setTime(now.toLocaleString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addFolder = () => {
    const name = prompt("Enter folder name:");
    if (name) {
      setFolders([...folders, { name, color: "bg-pink-600" }]);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/canonical/image/fetch/c_limit,f_auto,q_auto,fl_sanitize,c_fill,w_1380,h_776/https%3A%2F%2Fubuntu.com%2Fwp-content%2Fuploads%2Ff202%2Fkudu-ld.jpeg')",
      }}
    >
      {/*NavBar */}
      <div className="w-full h-8 bg-black bg-opacity-80 text-white flex justify-between items-center px-4 text-sm fixed top-0 z-50">
        <div className="flex space-x-2">
          <BsCircle />
          <BsCircle />
          <BsCircle />
        </div>

        {/* Time when click popup comes */}
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setShowWifi(false);
            setShowBattery(false);
          }}
        >
          {time}
        </div>

        <div className="flex items-center space-x-3 relative">
          {/* Wifi */}
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowWifi(!showWifi);
              setShowBattery(false);
              setShowCalendar(false);
            }}
          >
            <FaWifi />
          </div>
          {showWifi && (
            <div className="absolute right-12 top-8 bg-gray-800 text-white p-2 rounded shadow w-40">
              <p className="font-bold">Wi-Fi Networks</p>
              <ul className="text-sm space-y-1 mt-1">
                <li>NG_Main_Class</li>
                <li>NG_Library</li>
                <li>NG_Office</li>
              </ul>
            </div>
          )}

          <FaVolumeUp />

          {/* Battery */}
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowBattery(!showBattery);
              setShowWifi(false);
              setShowCalendar(false);
            }}
          >
            <FaBatteryFull />
          </div>
          {showBattery && (
            <div className="absolute right-0 top-8 bg-gray-800 text-white p-2 rounded shadow w-40">
              <p className="font-bold">Battery Status</p>
              <p>🔋 66% (Charging)</p>
              <p>⚡ Est. 2h 30m left</p>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Calendar</h2>
          <input type="date" className="border p-2" />
        </div>
      )}

      {/* Left Sidebar Folders */}
      <div className="absolute left-2 top-16 space-y-4 text-white">
        {folders.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center space-y-1 cursor-pointer"
          >
            <div
              className={`w-10 h-10 ${item.color} flex items-center justify-center rounded`}
            >
              <FaFolder className="text-yellow-200 text-2xl" />
            </div>
            <span className="text-xs">{item.name}</span>
          </div>
        ))}
        <button
          onClick={addFolder}
          className="text-xs bg-black bg-opacity-50 px-2 py-1 rounded mt-2"
        >
          + New Folder
        </button>
      </div>

      {/* Bottom Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-6 bg-black bg-opacity-40 px-6 py-2 rounded-2xl">
        {[
          "🔥 Browser",
          "👜 Files",
          "❓ Help",
          "🌐 Terminal",
          "💻 Code",
          "💽 Media",
          "⚙ Settings",
        ].map((icon, idx) => (
          <div
            key={idx}
            onClick={() => setOpenApp(icon)}
            className="w-10 h-10 flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition"
          >
            {icon.split(" ")[0]}
          </div>
        ))}
      </div>

      {/* Opened App Window */}
      {openApp && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-40 bg-gray-900 text-white rounded shadow-lg p-3">
          <div className="flex justify-between items-center border-b border-gray-700 pb-1 mb-2">
            <span>{openApp}</span>
            <button onClick={() => setOpenApp(null)}>❌</button>
          </div>
          <p className="text-sm">This is {openApp} window.</p>
        </div>
      )}
    </div>
  );
}
