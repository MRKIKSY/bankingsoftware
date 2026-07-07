export default function Invest({ onClose, onSelect }) {
  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-sm">
      <h2 className="font-bold mb-4">Choose Investment Plan</h2>
{/* 
      <button
        onClick={() => onSelect(7, 7)}
        className="w-full mb-2 bg-blue-600 text-white py-2 rounded"
      >
        7 Days · 7%
      </button>

      <button
        onClick={() => onSelect(14, 14)}
        className="w-full mb-2 bg-indigo-600 text-white py-2 rounded"
      >
        14 Days · 14%
      </button> */}

      <button
        onClick={() => onSelect(21, 21)}
        className="w-full bg-purple-600 text-white py-2 rounded"
      >
        21 Days · 21%
      </button>

      <button
        onClick={onClose}
        className="mt-4 text-sm text-gray-500 w-full"
      >
        Cancel
      </button>
    </div>
  );
}
