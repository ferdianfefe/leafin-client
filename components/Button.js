import { useRouter } from 'next/router';

const Button = ({ children, className, type, href }) => {
  const router = useRouter();

  if (!type) {
    type = null;
  }

  if (href) {
    return (
      <button
        onClick={() => router.push(href)}
        type={type}
        className={`rounded-xl w-full py-[14px] ${className}`}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        className={`rounded-xl w-full py-[14px] ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
