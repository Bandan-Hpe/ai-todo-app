"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Task() {
  const tasks = useQuery(api.task.get);

  return (
    <div>
      {tasks?.map((task, idx) => <p key={idx}>{JSON.stringify(task)}</p>)}
    </div>
  );
}
