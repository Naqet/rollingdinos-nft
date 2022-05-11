import React from "react";
import Image from "next/image";
import eddie from "../public/dinos/Eddie.jpeg";
import lana from "../public/dinos/Lana.jpeg";
import community from "../public/dinos/Community.jpeg";
import dev from "../public/dinos/Developer.jpeg";

export default function Team() {
  const team = [
    { nick: "Rolling Rex", image: lana, role: "Owner" },
    { nick: "Rolling Flecki", image: eddie, role: "Moderator" },
    { nick: "Rolling Naqet", image: dev, role: "Developer" },
    { nick: "Rolling Paletti", image: community, role: "Manager" },
  ];
  return (
    <>
      <img
        className="w-full -my-px"
        src="/sections/mission-bg.svg"
        alt="Planet"
      />
      <h2 id="team">Rolling Team</h2>
      <section className="team-body flex justify-center gap-4 pt-10 flex-wrap xl:gap-10">
        {team.map((member) => (
          <div
            key={member.nick}
            className="grid place-items-center text-indigo-700"
          >
            <p className="font-bangers text-4xl my-2">{member.nick}</p>
            <Image
              alt="Dino team member"
              width={288}
              height={288}
              src={member.image}
              className="rounded-3xl"
              placeholder="blur"
            />
            <p className="team-role my-2 ml-4">{member.role}</p>
          </div>
        ))}
      </section>
      <img
        className="w-full -mt-px"
        src="/sections/team-bottom.svg"
        alt="Planet"
      />
    </>
  );
}
