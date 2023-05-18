import type { Skill } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import ExperienceStep from "~/components/experience-step";
import RoundedBox from "~/components/rounded-box";
import { db } from "~/utils/db.server";

export async function loader() {
  const experiences = await db.experience.findMany({
    include: { skills: true },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });

  return json({ experiences });
}

export default function About() {
  const { experiences } = useLoaderData<typeof loader>();
  return (
    <RoundedBox>
      <div className="bg-white px-10 pb-6 pt-9">
        <h1 className="text-3xl font-bold after:block after:h-1 after:w-12 after:rounded-md after:bg-accent after:content-['']">
          About me
        </h1>
        <p className="mt-6">
          My absolute passion lies in creating products that make our everyday
          lives easier. I detest nothing more than doing the same things over
          and over again.
        </p>
        <p className="mt-4">
          Now, unfortunately, I have two left hands when it comes to topics like
          electrical circuits or creating inventions like washing machines or
          dishwashers. Fortunately, through my skills as a software developer, I
          can enable digital products that take work off our hands or offer
          exciting tasks in our spare time. So far, I have been able to solve
          manually complex tasks through a time-tracking calendar, the easy
          recording of card game results and improving the product for
          registering damages in windscreens. I'm really lucky that all the
          different groups I worked with had a great team spirit. Everyone was
          able to contribute his/her strengths to improve the products so that
          they can be loved by thousands of users today.
        </p>
        <p className="mt-4">
          To be always able to find the best solutions for emerging challenges,
          continuous training is essential for me because the focus is always on
          creating the best product for the customer. Frameworks for the
          frontend or backend are always just tools, so the highest interest for
          myself is to be able to handle them competently. Therefore, it doesn't
          matter if the product uses Angular, React, Vue, Svelte, ... I'm in!{" "}
        </p>
        <p className="mt-4">
          To create exciting applications again and again, it is important to
          think outside the box of software development. I love to explore the
          world! Travelling together with my wife always gives us new
          impressions. During my studies of computer science, I became a little
          bookworm, so you will find me on the weekend with a cup of hot tea and
          a good book or “The Economist”.
        </p>
      </div>
      <div className="bg-gray-lighter px-10 pb-9 pt-6">
        <h2 className="text-3xl font-bold">Experience</h2>
        <div className="mt-6">
          {experiences.map((experience, index, arr) => (
            <ExperienceStep
              key={experience.id}
              jobTitle={experience.jobTitle}
              employer={experience.employer}
              start={new Date(experience.start)}
              end={
                experience.end != null ? new Date(experience.end) : undefined
              }
              skills={experience.skills.map((skill: Skill) => skill.title)}
              options={{
                isFirstInColumn: index == 0,
                isLastInColumn: index == arr.length - 1,
              }}
            />
          ))}
        </div>
      </div>
    </RoundedBox>
  );
}
