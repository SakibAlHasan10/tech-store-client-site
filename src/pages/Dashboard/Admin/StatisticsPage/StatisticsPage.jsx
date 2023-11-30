import { useContext } from "react";
import { myContext } from "../../RootPages/RootPages";
import { getLocalStorageData } from "../../Utility/StorageData";
import { PieChart, Pie, Cell } from "recharts";
const Statistics = () => {
  const allCategory = useContext(myContext);
  const localStorData = getLocalStorageData();
  const totalDonation = allCategory.length;
  const filterLocalData = allCategory.filter((data) =>
    localStorData.includes(data.id)
  );
  const yourDonation = filterLocalData.length;
  const data = [
    { name: "Total Donation", value: totalDonation - yourDonation },
    { name: "Your Donation", value: yourDonation },
  ];
  // console.log(data, totalDonation, yourDonation);
  const COLORS = ["#e65007", "#00C49F"];

  const RADIAN = Math.PI / 180;
  // console.log(RADIAN*180)
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };
  return (
    <div className="max-w-screen-xl mx-auto md:px-8 mb-10 pb-16">
      <PieChart width={400} height={400} className="mx-auto  ">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex">
        <div className="md:flex gap-10 mx-auto justify-center">
          <div className="flex items-center gap-3">
            <p className="text-lg font-normal">Your Donation</p>
            <span className="bg-[#00C49F] w-20 h-2"></span>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-normal">Total Donation</p>
            <span className="bg-[#e65007] w-20 h-2"></span>
          </div>
        </div>
      </div>
    </div>
  );
};