import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { plantName } = router.query;

  return (
    <div>
      <h1>Detail</h1>
      <p>{plantName}</p>
    </div>
  );
}
