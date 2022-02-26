import Link from 'next/link';

export default function Navbar({ active }) {
  const navs = [
    {
      svg: `M12.1726 1.21019C11.9101 0.947734 11.554 0.800293 11.1828 0.800293C10.8116 0.800293 10.4555 0.947734 10.193 1.21019L0.392996 11.0102C0.137975 11.2742 -0.00313686 11.6279 5.29237e-05 11.995C0.00324271 12.362 0.150479 12.7132 0.410051 12.9727C0.669622 13.2323 1.02076 13.3795 1.38783 13.3827C1.75491 13.3859 2.10855 13.2448 2.3726 12.9898L2.7828 12.5796V21.8C2.7828 22.1713 2.9303 22.5274 3.19285 22.7899C3.4554 23.0525 3.81149 23.2 4.1828 23.2H6.9828C7.3541 23.2 7.7102 23.0525 7.97275 22.7899C8.2353 22.5274 8.3828 22.1713 8.3828 21.8V19C8.3828 18.6287 8.5303 18.2726 8.79285 18.01C9.0554 17.7475 9.41149 17.6 9.7828 17.6H12.5828C12.9541 17.6 13.3102 17.7475 13.5727 18.01C13.8353 18.2726 13.9828 18.6287 13.9828 19V21.8C13.9828 22.1713 14.1303 22.5274 14.3928 22.7899C14.6554 23.0525 15.0115 23.2 15.3828 23.2H18.1828C18.5541 23.2 18.9102 23.0525 19.1727 22.7899C19.4353 22.5274 19.5828 22.1713 19.5828 21.8V12.5796L19.993 12.9898C20.257 13.2448 20.6107 13.3859 20.9778 13.3827C21.3448 13.3795 21.696 13.2323 21.9555 12.9727C22.2151 12.7132 22.3624 12.362 22.3655 11.995C22.3687 11.6279 22.2276 11.2742 21.9726 11.0102L12.1726 1.21019Z`,
      name: 'Home',
      href: '/',
    },
    {
      svg: `M5.6 0.800049C5.2287 0.800049 4.8726 0.947548 4.61005 1.2101C4.3475 1.47265 4.2 1.82875 4.2 2.20005V3.60005H2.8C2.05739 3.60005 1.3452 3.89505 0.820101 4.42015C0.294999 4.94525 0 5.65744 0 6.40005V20.4C0 21.1427 0.294999 21.8548 0.820101 22.3799C1.3452 22.905 2.05739 23.2 2.8 23.2H19.6C20.3426 23.2 21.0548 22.905 21.5799 22.3799C22.105 21.8548 22.4 21.1427 22.4 20.4V6.40005C22.4 5.65744 22.105 4.94525 21.5799 4.42015C21.0548 3.89505 20.3426 3.60005 19.6 3.60005H18.2V2.20005C18.2 1.82875 18.0525 1.47265 17.7899 1.2101C17.5274 0.947548 17.1713 0.800049 16.8 0.800049C16.4287 0.800049 16.0726 0.947548 15.81 1.2101C15.5475 1.47265 15.4 1.82875 15.4 2.20005V3.60005H7V2.20005C7 1.82875 6.8525 1.47265 6.58995 1.2101C6.3274 0.947548 5.9713 0.800049 5.6 0.800049ZM5.6 7.80005C5.2287 7.80005 4.8726 7.94755 4.61005 8.2101C4.3475 8.47265 4.2 8.82874 4.2 9.20005C4.2 9.57135 4.3475 9.92745 4.61005 10.19C4.8726 10.4525 5.2287 10.6 5.6 10.6H16.8C17.1713 10.6 17.5274 10.4525 17.7899 10.19C18.0525 9.92745 18.2 9.57135 18.2 9.20005C18.2 8.82874 18.0525 8.47265 17.7899 8.2101C17.5274 7.94755 17.1713 7.80005 16.8 7.80005H5.6Z`,
      name: 'Activities',
      href: '/activities',
    },
    {
      svg: `M2.8 0.199951C2.05739 0.199951 1.3452 0.49495 0.820101 1.02005C0.294999 1.54515 0 2.25735 0 2.99995V17C0 17.7426 0.294999 18.4548 0.820101 18.9799C1.3452 19.505 2.05739 19.8 2.8 19.8H19.6C20.3426 19.8 21.0548 19.505 21.5799 18.9799C22.105 18.4548 22.4 17.7426 22.4 17V2.99995C22.4 2.25735 22.105 1.54515 21.5799 1.02005C21.0548 0.49495 20.3426 0.199951 19.6 0.199951H2.8ZM19.6 17H2.8L8.4 5.79995L12.6 14.2L15.4 8.59995L19.6 17Z`,
      name: 'Feeds',
      href: '/feeds',
    },
    {
      svg: `M1.4 0.400024C1.0287 0.400024 0.672601 0.547524 0.41005 0.810075C0.1475 1.07263 0 1.42872 0 1.80002C0 2.17133 0.1475 2.52742 0.41005 2.78997C0.672601 3.05252 1.0287 3.20002 1.4 3.20002H3.108L3.535 4.91082C3.53924 4.93052 3.54391 4.95013 3.549 4.96962L5.4502 12.5716L4.2 13.8204C2.436 15.5844 3.6848 18.6 6.1796 18.6H18.2C18.5713 18.6 18.9274 18.4525 19.1899 18.19C19.4525 17.9274 19.6 17.5713 19.6 17.2C19.6 16.8287 19.4525 16.4726 19.1899 16.2101C18.9274 15.9475 18.5713 15.8 18.2 15.8H6.1796L7.5796 14.4H16.8C17.0599 14.3999 17.3147 14.3274 17.5357 14.1906C17.7568 14.0539 17.9354 13.8583 18.0516 13.6258L22.2516 5.22582C22.3582 5.01243 22.4086 4.77534 22.3978 4.53703C22.3871 4.29873 22.3157 4.06712 22.1903 3.86418C22.0649 3.66124 21.8897 3.4937 21.6814 3.37747C21.4731 3.26123 21.2385 3.20015 21 3.20002H5.992L5.558 1.45982C5.48216 1.15708 5.30733 0.888356 5.06129 0.696342C4.81525 0.504327 4.5121 0.400033 4.2 0.400024H1.4ZM19.6 22.1C19.6 22.657 19.3787 23.1911 18.9849 23.5849C18.5911 23.9788 18.057 24.2 17.5 24.2C16.943 24.2 16.4089 23.9788 16.0151 23.5849C15.6212 23.1911 15.4 22.657 15.4 22.1C15.4 21.5431 15.6212 21.0089 16.0151 20.6151C16.4089 20.2213 16.943 20 17.5 20C18.057 20 18.5911 20.2213 18.9849 20.6151C19.3787 21.0089 19.6 21.5431 19.6 22.1ZM6.3 24.2C6.85695 24.2 7.3911 23.9788 7.78492 23.5849C8.17875 23.1911 8.4 22.657 8.4 22.1C8.4 21.5431 8.17875 21.0089 7.78492 20.6151C7.3911 20.2213 6.85695 20 6.3 20C5.74304 20 5.2089 20.2213 4.81507 20.6151C4.42125 21.0089 4.2 21.5431 4.2 22.1C4.2 22.657 4.42125 23.1911 4.81507 23.5849C5.2089 23.9788 5.74304 24.2 6.3 24.2Z`,
      name: 'Marketplace',
      href: '/marketplace',
    },
    {
      svg: `M22.4 12C22.4 14.9705 21.22 17.8192 19.1196 19.9196C17.0192 22.0201 14.1704 23.2 11.2 23.2C8.22957 23.2 5.38081 22.0201 3.2804 19.9196C1.18 17.8192 0 14.9705 0 12C0 9.02962 1.18 6.18086 3.2804 4.08045C5.38081 1.98005 8.22957 0.800049 11.2 0.800049C14.1704 0.800049 17.0192 1.98005 19.1196 4.08045C21.22 6.18086 22.4 9.02962 22.4 12ZM14 7.80005C14 8.54265 13.705 9.25484 13.1799 9.77995C12.6548 10.305 11.9426 10.6 11.2 10.6C10.4574 10.6 9.7452 10.305 9.2201 9.77995C8.695 9.25484 8.4 8.54265 8.4 7.80005C8.4 7.05744 8.695 6.34525 9.2201 5.82015C9.7452 5.29505 10.4574 5.00005 11.2 5.00005C11.9426 5.00005 12.6548 5.29505 13.1799 5.82015C13.705 6.34525 14 7.05744 14 7.80005ZM11.2 13.4C9.85964 13.3998 8.54739 13.7843 7.41918 14.508C6.29098 15.2317 5.39426 16.2641 4.8356 17.4824C5.62335 18.3989 6.59998 19.1341 7.69852 19.6377C8.79706 20.1413 9.99153 20.4014 11.2 20.4C12.4085 20.4014 13.6029 20.1413 14.7015 19.6377C15.8 19.1341 16.7767 18.3989 17.5644 17.4824C17.0057 16.2641 16.109 15.2317 14.9808 14.508C13.8526 13.7843 12.5404 13.3998 11.2 13.4Z`,
      name: 'Profile',
      href: '/profile',
    },
  ];

  return (
    <footer className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow-2xl border">
      <div id="tabs" className="flex justify-between">
        {navs.map(({ svg, name, href }, i) => {
          let className = `w-full hover:text-[#9F9E9E] justify-center inline-block text-center pt-2 pb-1 text-[#B5B5B5]`;
          if (name.toLowerCase() == active.toLowerCase()) {
            className = `w-full justify-center inline-block text-center pt-2 pb-1 text-[#32B84D]`;
          }

          return (
            <Link href={href} key={i}>
              <a className={className}>
                <svg
                  className="inline-block mb-1 w-full"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d={svg} />
                </svg>

                <span className="block font-semibold text-xs">{name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
