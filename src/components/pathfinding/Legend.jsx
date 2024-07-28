import React from 'react';

const LegendItem = ({ color, label }) => (
  <div className="flex items-center">
    <div className={`w-4 h-4 ${color} rounded-sm mr-2`}></div>
    <span className="text-sm text-white">{label}</span>
  </div>
);

const Legend = () => (
  <div className="p-4 bg-gray-900 rounded-lg mt-6">
    <div className="flex flex-wrap justify-center gap-4">
      <LegendItem color="bg-green-500" label="Start Node" />
      <LegendItem color="bg-red-500" label="End Node" />
      <LegendItem color="bg-gray-600" label="Wall" />
      <LegendItem color="bg-blue-300" label="Visited Node" />
      <LegendItem color="bg-yellow-300" label="Shortest Path" />
    </div>
  </div>
);

export default Legend;
