import { useRouter } from 'next/router';

const Verification = () => {
    const router = useRouter();
    const { token, expired } = router.query;
  return (
    <div>Verification</div>
  )
}

export default Verification