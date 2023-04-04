import { useRouter } from "next/router";
import { useEffect } from "react";

const Verification = () => {
  const router = useRouter();
  const { token, expired } = router.query;
  useEffect(() => {
    return () => {};
  }, [token, expired]);
  return <div>{token && "Verified"}</div>;
};

export default Verification;
