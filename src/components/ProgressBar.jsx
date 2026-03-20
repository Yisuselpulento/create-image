const ProgressBar = ({ value = 0, color = "bg-red-500" }) => {
  return (
    <div className="w-full h-2 bg-zinc-700/70 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default ProgressBar