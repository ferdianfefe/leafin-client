const FilterItem = ({ text, active }) => {
  return (
    <div
      className={`flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 border ${
        active
          ? "border-primary text-primary"
          : "border-[#E0E0E0] text-[#E0E0E0]"
      } text-sm font-bold gap-2`}
    >
      <p className="">{text}</p>
    </div>
  );
};

export default FilterItem;
