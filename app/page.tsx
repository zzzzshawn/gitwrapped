
import Github from "@/components/Github/Github";
import GithubInput from "@/components/Input/GithubInput";


export default async function Home() {
  return (
    <div className="w-full min-h-screen max-w-6xl mx-auto p-5 max-sm:p-0 flex flex-col items-center justify-center overflow-hidden ">
      <div className="h-[90vh] w-full flex items-center justify-center">

      <GithubInput/>
      </div>
      <Github/>
    </div>
  );
}
