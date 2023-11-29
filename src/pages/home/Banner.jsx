const Banner = () => {
  return (
    <div className="bg-gradient-to-tl to-[#1962A6] from-0% rotate-[135]  from-[#6EB846] to-100%  bg-cover hover:bg-gradient-to-br h-[80vh] duration-500 transition hover:transition hover:delay-200 hover:duration-700 w-full">
      <img
        src="https://thegadgetflow.com/wp-content/uploads/2021/02/Tech-Gadgets-New-2021-Category-Large.jpg"
        alt=""
        className="w-full h-full"
      />

      <div className="absolute  w-full h-20 bg-[#ffffff31] top-0"></div>

      <div className="absolute top-20 ">
        <div className="flex justify-center w-[100vw] flex-col items-center h-[60vh]   ">
          <h1 className="text-5xl font-extrabold text-white">Tech and Gadgets</h1>
          <p className="text-xl font-bold text-white mt-2">
            The best tech announcements and latest gadgets curated by the Gadget
            Flow team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
