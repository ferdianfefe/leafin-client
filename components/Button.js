import { useRouter } from "next/router";

const Button = ({ disabled, children, className, type, href, onClick }) => {
  const router = useRouter();

  if (href) {
    return (
      <button
        disabled={disabled}
        onClick={() => router.push(href)}
        type={type}
        className={`rounded-xl w-full py-[14px] disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        disabled={disabled}
        type={type}
        className={`rounded-xl w-full py-[14px] disabled:opacity-50 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
