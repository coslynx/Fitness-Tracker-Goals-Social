"use client";

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/api/client";
import GoalForm from "@/components/features/goals/GoalForm";
import GoalList from "@/components/features/goals/GoalList";

export default function GoalsPage() {
  const { data: session } = useSession();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        if (session) {
          const { data, error } = await supabase
            .from("goals")
            .select("*")
            .eq("userId", session.user.id);

          if (error) {
            setError(error.message);
          } else {
            setGoals(data);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [session]);

  const handleGoalSubmit = (newGoal: { name: string; targetDate: string; outcome: string }) => {
    setGoals([...goals, newGoal]);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Fitness Goals</h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Loading Goals...</p>}
      {!isLoading && (
        <>
          <GoalForm onSubmit={handleGoalSubmit} />
          <GoalList goals={goals} />
        </>
      )}
    </main>
  );
}

export const metadata = {
  title: "Goals - Fitness Tracker",
  description: "Set and manage your fitness goals",
};