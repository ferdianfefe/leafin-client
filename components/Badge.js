import Image from 'next/image';

const Badge = ({ children }) => {
  return (
    <div className="flex shrink-0 overflow-hidden items-center justify-center rounded-full h-10 w-28 bg-primary text-white text-sm font-bold gap-2">
      <div className="relative w-4 h-4">
        <Image src="/crown.svg" alt="crown" objectFit="contain" layout="fill" />
      </div>
      {children}
    </div>
  );
};

export default Badge;
