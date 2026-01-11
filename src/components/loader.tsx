
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="animate-pulse">
        <Image src="/logo.png" alt="Eventradar Logo" width={256} height={256} />
      </div>
    </div>
  );
};

export default Loader;
