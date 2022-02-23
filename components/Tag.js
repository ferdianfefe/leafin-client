const Tag = ({ text }) => {
  return (
    <div
      className={`flex shrink-0 overflow-hidden items-center justify-center rounded-full mr-2 h-8 w-24 bg-primary text-white text-sm font-bold gap-2`}
    >
      <p>{text}</p>
    </div>
  );
};

export default Tag;