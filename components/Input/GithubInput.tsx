"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { graphState, loadingState, usernameState, userStatsState } from "@/Recoil/State/atom";
import fetchUser from "@/actions/fetchUser";
import fetchGraph from "@/actions/fetchGraph";

const githubInputSchema = z.object({
  username: z.string().min(2).max(50),
});

const GithubInput = () => {
  const setUsername = useSetRecoilState(usernameState);
  const setLoading = useSetRecoilState(loadingState);
  const setUserStats = useSetRecoilState(userStatsState);
  const setGraphState = useSetRecoilState(graphState);

  const form = useForm<z.infer<typeof githubInputSchema>>({
    resolver: zodResolver(githubInputSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof githubInputSchema>) {
    setLoading(true);
    setUsername(values.username);
    const { userStats } = await fetchUser(values.username);
    const graph = await fetchGraph(values.username);
    setUserStats(userStats);
    setGraphState(graph);
    setLoading(false);
    
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" relative">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="font-modernreg ">
                <FormLabel className="text-zinc-100/80">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Eg. zzzzshawn" {...field} />
                </FormControl>
                <FormDescription>Enter your Github username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="absolute top-9 right-1 p-2 backdrop-blur-xl backdrop-saturate-200 "
            type="submit"
          >
            <ArrowRight />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GithubInput;
