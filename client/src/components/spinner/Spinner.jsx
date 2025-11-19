export default function Spinner({ size = 12, color = "green-500" }) {
  return (
    <div className="flex justify-center items-center min-h-[20vh]">
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}