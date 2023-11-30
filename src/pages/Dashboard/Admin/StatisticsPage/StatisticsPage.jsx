
import { PieChart, Pie, Cell } from "recharts";
import useGetAllUser from "../../../../hooks/getAllUser/useGetAllUser";
import useAllProduct from "../../../../hooks/fetchaAlProduct/useAllProduct";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
const StatisticsPage = () => {
  const [allUser]=useGetAllUser()
  const [allProduct]=useAllProduct()
  const axiosSecure = useAxiosSecure()
  // get review
  const { data: allReviews = [] } = useQuery({
    queryKey: ["allReview",],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review`);

      return res?.data;
    },
  });

  const totalReview = allReviews?.length;
  const totalUser = allUser?.length;
  const totalProduct = allProduct?.length
  const data = [
    { name: "Total Users", value: totalUser},
    { name: "Total Products", value: totalProduct },
    { name: "Total Reviews", value: totalReview},
  ];
  
  

  const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

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
        {`${(percent * 100).toFixed(0)}%`}
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
            <p className="text-lg font-normal">Total Users: {totalUser}</p>
            <span className="bg-[#0088FE] w-20 h-2"></span>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-normal">Total Products: {totalProduct}</p>
            <span className="bg-[#00C49F] w-20 h-2"></span>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-lg font-normal">Total Reviews: {totalReview}</p>
            <span className="bg-[#FF8042] w-20 h-2"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
