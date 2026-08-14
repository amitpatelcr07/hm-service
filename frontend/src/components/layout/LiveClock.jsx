import { useEffect, useState } from "react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 17) return "Good Afternoon 🌤️";
    if (hour < 21) return "Good Evening 🌇";

    return "Good Night 🌙";
  };

  return (
    <div className="text-right">
      <p className="font-semibold text-gray-800">{getGreeting()}</p>

      <p className="text-sm text-gray-500">
        {currentTime.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p className="text-lg font-bold text-blue-600">
        {currentTime.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </p>
    </div>
  );
};

export default LiveClock;
