import { useRouter } from 'next/router';

const Button = ({ children, className, type, href }) => {
  const router = useRouter();

  if (href) {
    return (
      <button
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
        type={type}
        className={`rounded-xl w-full py-[14px] disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
