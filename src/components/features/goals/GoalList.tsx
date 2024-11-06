"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/api/client";
import GoalItem from "@/components/features/goals/GoalItem";

const GoalList = () => {
  const { data: session } = useSession();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("goals")
          .select("*")
          .eq("userId", session.user.id);

        if (error) {
          console.error("Error fetching goals:", error);
          return;
        }

        setGoals(data);
      }
    };

    fetchGoals();
  }, [session]);

  return (
    <ul className="space-y-4">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </ul>
  );
};

export default GoalList;