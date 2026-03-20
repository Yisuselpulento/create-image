 export  const getColor = (percent) => {
    if (percent <= 25) return "bg-red-500";
    if (percent <= 50) return "bg-orange-400";
    if (percent <= 75) return "bg-green-400";
    return "bg-blue-500"; // 76% - 100%
  };