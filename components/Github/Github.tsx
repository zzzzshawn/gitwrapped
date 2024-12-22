"use client";

import React, { useEffect, useRef } from "react";
import Followers from "./Github Components/Followers";
import LongestStreak from "./Github Components/LongestStreak";
import Stars from "./Github Components/Stars";
import CurrentStreak from "./Github Components/CurrentStreak";
import Repos from "./Github Components/Repos";
import Commit from "./Github Components/Commits";
import PRs from "./Github Components/PRs";
import Issues from "./Github Components/Issues";
import ContributedTo from "./Github Components/ContributedTo";
import { useRecoilValue } from "recoil";
import {
  graphState,
  loadingState,
  usernameState,
  userStatsState,
} from "@/Recoil/State/atom";
import { UserStats } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import html2canvas from "html2canvas";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";


const Github = () => {
  const userStats = useRecoilValue(userStatsState) as UserStats;
  const graph = useRecoilValue(graphState);
  const loading = useRecoilValue(loadingState);
  const username = useRecoilValue(usernameState);

  const githubRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadImage = async () => {
    toast({title: "Downloading Bento", generating: true})
    if (githubRef.current) {
      const canvas = await html2canvas(githubRef.current, {
        scale: 2.5, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
    });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `${username || "github-stats"}.png`;
      link.click();
      toast({title: 'Bento Downloaded'})
    }
  };

  useEffect(() => {
    if (!loading && githubRef.current) {
      githubRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  return (
    <div className="relative size-full">
      {!loading && (
        <motion.div
          ref={githubRef}
          className="text-white w-full lg:w-[100%] max-w-6xl mx-auto flex items-start justify-start flex-col p-3 relative pt-[3.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-4 sm:px-10 px-3  mb-2">
            <div className="">
              <Image
                src={userStats.AvatarUrl || "/assets/user.svg"}
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full size-12 -translate-y-1 object-cover"
              />
            </div>
            <h1 className="font-modernbold leading-tight text-3xl max-w-2xl py-1">
              {userStats.Repositories ? username : "User not found"}{" "}
              {userStats.Repositories && "'s Github."}
            </h1>
          </div>
          <div className="grid grid-cols-4 grid-rows-4 md:grid-cols-8 md:grid-rows-4 gap-2 w-full md:h-[600px] max-sm:min-h-[100vh]">
            <LongestStreak
              streak={userStats["Longest Streak"] || 0}
              start={userStats["Longest Streak Start"] || ""}
              end={userStats["Longest Streak End"] || ""}
              classname="p-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 col-start-3 col-end-5 "
            />
            <CurrentStreak
              streak={userStats["Current Streak"] || 0}
              start={userStats["Current Streak Start"] || ""}
              end={userStats["Current Streak End"] || ""}
              classname="p-2 md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-4 col-start-2 col-end-5"
            />
            <Followers
              followers={userStats.Followers || 0}
              classname="p-2 md:col-start-7 md:col-end-9 md:row-start-4 md:row-end-5 row-start-4 row-end-4 col-start-2 col-end-3"
            />
            <Repos
              repos={userStats.Repositories || 0}
              classname="p-2 md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-2 col-start-4 col-end-5 row-start-3 row-end-5"
            />
            <Commit
              commits={userStats["Total Contibutions"] || 0}
              classname="p-2 md:col-start-5 md:col-end-7 md:row-start-2 md:row-end-5 col-start-1 col-end-4 row-start-3"
            />
            <PRs
              pr={userStats["Pull Requests"] || 0}
              classname="p-2 md:col-start-7 md:col-end-8 md:row-start-2 md:row-end-4 col-start-1 col-end-2 row-start-2"
            />
            <ContributedTo
              contros={userStats["Contributed To"] || 0}
              classname="p-2 md:col-start-3 md:col-end-5 md:row-start-4 md:row-end-5"
            />
            <Issues
              issues={userStats.Issues || 0}
              classname="p-2 md:col-start-8 md:col-end-9 md:row-start-2 md:row-end-4 col-start-1 row-start-4"
            />
            <Stars
              stars={userStats["Star Earned"] || 0}
              classname="p-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 col-start-1 col-end-3 row-start-1"
            />
          </div>
          <div className="max-sm:px-5 mt-2 w-[40rem] mx-auto">
            <h1 className="max-w-2xl mx-auto font-modernbold text-2xl mb-2">
              Contribution Graph:
            </h1>
          </div>
          <div className="px-5 rounded-2xl w-full mx-auto flex flex-col relative overflow-auto">
            <div className="relative max-w-2xl mx-auto">
              <div
                className="bg-zinc-800/20 backdrop-blur-2xl border border-zinc-200/10 backdrop-saturate-200 p-3 rounded-2xl mx-auto overflow-auto max-w-2xl opacity-95 hover:opacity-100 z-[9999] cursor-pointer"
                dangerouslySetInnerHTML={{
                  __html: graph.graph,
                }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}
      <Button
        onClick={handleDownloadImage}
        className="border-zinc-200/20 bg-zinc-800/20 rounded-full py-6 absolute bottom-0 right-0 group"
      >
        <ArrowDown size={18} />
        <p className="font-modernreg text-zinc-400 max-lg:border border-zinc-200/20 max-lg:bg-primary/90 max-lg:p-1 max-lg:text-white/90 px-2 max-lg:px-3 max-lg:rounded-lg bottom-0 right-14 max-lg:absolute lg:flex translate-x-2 max-lg:opacity-0 max-lg:group-hover:opacity-100 max-lg:group-hover:translate-x-0 duration-500 lg:group-hover:text-white/80">Download Bento</p>
      </Button>
    </div>
  );
};

export default Github;

