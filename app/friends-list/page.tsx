import Button from "@/components/custom/CustomBtn/Button";
import React from "react";

// friend suggestions data
const friendSuggestions = [
  { id: 1, name: "Abhishek singh", image: "Abhishek.jpg", initials: "rk" },
  { id: 2, name: "Ravi Kumar", image: "ravi.jpg" },
  { id: 3, name: "Kishan Kumar", image: "kishan.jpg" },
  { id: 4, name: "Sonu singh", image: "Sonu.jpg", initials: "ma" },
  { id: 5, name: "Kishan Kumar", image: "kishan.jpg" },
  { id: 6, name: "Sonu singh", image: "Sonu.jpg", initials: "ma" }
];

const page = () => {
  const friendRequests = []; // empty → No Friend Requests UI

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-8 ml-15">
      
      {/* Friend Requests */}
      <h1 className="text-2xl font-semibold mb-6">Friend Requests</h1>

      {friendRequests.length === 0 && (
        <div className="mb-16">
          <div className="text-gray-400 mb-4">
            <span className="text-5xl">👤✕</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Friend Requests</h2>
          <p className="text-gray-400 max-w-sm">
            Looks like you are all caught up! Why not explore and connect with new people?
          </p>
        </div>
      )}

      {/* Friend Suggestions */}
      <h2 className="text-2xl font-semibold mb-6">Friend Suggestions</h2>

      <div className="flex flex-wrap gap-10 ">
        {friendSuggestions.map((item) => (
          <div
            key={item.id}
            className="bg-[#1A2332] rounded-xl p-4 flex flex-col items-center w-80"
          >
            {/* Profile Image / Initials */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 rounded-full object-cover border mb-4"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-xl mb-4">
                {item.initials}
              </div>
            )}

            <p className="font-medium mb-4 capitalize">{item.name}</p>

            <Button className="w-full flex items-center justify-center gap-2">
              <span>➕</span> Add Friend
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
