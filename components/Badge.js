import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectUser } from './slices/loginSlice';

const Badge = ({ children }) => {
  return (
    <div className="flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 bg-primary text-white text-sm font-bold gap-2">
      <div className="relative w-4 h-4">
        <Image
          src="/assets/crown.svg"
          alt="crown"
          objectFit="contain"
          layout="fill"
        />
      </div>
      {children}
    </div>
  );
};

export default Badge;
