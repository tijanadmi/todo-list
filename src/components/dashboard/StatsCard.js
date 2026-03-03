// src/components/dashboard/StatsCard.js

export default function StatsCard({ title, value, description }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl md:text-2xl font-semibold">{value}</p>
      {description && (
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}
