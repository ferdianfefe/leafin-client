import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="container mx-auto p-5 flex flex-wrap justify-center">
      INI SUDAH LOGIN
      <br />
      <Link href="/ar">
        <a>ar</a>
      </Link>
      <Navbar active="home" />
    </div>
  );
}
