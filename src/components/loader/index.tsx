
export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-6 h-6 bg-purple-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}
