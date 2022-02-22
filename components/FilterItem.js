const FilterItem = ({ text }) => {
  return (
    <div className="flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 border border-primary text-primary text-sm font-bold gap-2">
      <p className="text-primary">{text}</p>
    </div>
  );
};

export default FilterItem;
