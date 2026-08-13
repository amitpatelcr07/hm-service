import { useLoading } from "../../hooks/useLoading";

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl px-10 py-8 flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 border-r-blue-500 animate-[spin1_0.9s_cubic-bezier(0.6,0.2,0.4,0.8)_infinite]" />
          <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-indigo-400 animate-[spin2_1.3s_linear_infinite]" />
        </div>
        <p className="text-gray-700 font-medium text-sm">Please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
