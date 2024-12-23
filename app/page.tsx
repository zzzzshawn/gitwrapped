import Github from "@/components/Github/Github";
import GithubInput from "@/components/Input/GithubInput";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full min-h-screen mx-auto p-5 max-sm:p-0 flex flex-col items-center justify-center overflow-visible relative">
        <Link
          href={`https://github.com/zzzzshawn`}
          className="cursor-pointer flex items-center justify-start gap-2 z-10 w-full font-modernmono text-zinc-600 hover:text-white/60 px-5 max-sm:py-3"
        >
          <h1>GitWrapped by @zzzzshawn </h1>
          <GithubIcon size={18} />
        </Link>
      <Image
        src={`/assets/grad1.svg`}
        alt=""
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40"
        priority
      />
      <div className="h-[92vh] w-full flex items-center justify-center">
        <GithubInput />
      </div>
      <Github />
    </div>
  );
}
