const Button = ({ children, className, type }) => {
  return (
    <button type={type} className={`rounded-xl w-full py-[14px] ${className}`}>
      {children}
    </button>
  );
};

export default Button;
