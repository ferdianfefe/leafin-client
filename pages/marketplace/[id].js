import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Idmarketplace() {
  const router = useRouter();
  const { id } = router.query;
  const image = id.replace(' ', '-');
  return (
    <>
      <Link href="/marketplace">
        <a className="absolute left-5 mt-5">
          <img
            src="/assets/backBtn.svg"
            alt="edit"
            style={{
              filter:
                'invert(99%) sepia(11%) saturate(0%) hue-rotate(231deg) brightness(106%) contrast(100%)',
            }}
            className="w-5 h-5 relative items-center justify-self-end"
          />
        </a>
      </Link>
      <div className="relative w-full h-[400px] -z-10">
        <Image src={`/assets/${image}.png`} layout="fill" alt="Pupuk Navos" />
      </div>
      <div className="fixed bottom-0 container mx-auto px-5 rounded-t-2xl bg-white">
        <div className="flex justify-between font-bold items-center pt-3">
          <h1 className="text-[26px] text flex flex-col">
            {id}
            <span className="text-[15.15px]">LSPr - 004 - IDN</span>
          </h1>
          <p className="text-lg">12.69 $</p>
        </div>
        <div className="mt-4 mb-4">
          <h1 className="font-bold text-[15.15px]">Description</h1>
          <span className="text-xs w-full">
            Pupuk Kandang Kambing Organik halus <br />
            • Steril <br />
            • Siap Pakai <br />
            • Tidak <br />
            Berbau Terbuat dari kotoran kambing yang diproses secara alami.
            Cocok ditambahkan pada media tanam untuk buah-buahan.
          </span>
        </div>

        <Button className="bg-primary text-white font-bold w-full mb-5 flex justify-center gap-2">
          <div className="w-5 h-5 relative">
            <Image src="/assets/shop-cart.svg" layout="fill" alt="shop cart" />
          </div>
          Buy Now
        </Button>
      </div>
    </>
  );
}
