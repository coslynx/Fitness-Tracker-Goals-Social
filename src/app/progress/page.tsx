"use client";

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/api/client";
import WorkoutForm from "@/components/features/progress/WorkoutForm";
import ProgressChart from "@/components/features/progress/ProgressChart";

interface Workout {
  id: number;
  activity: string;
  duration: number;
  metrics: number;
  date: string;
  userId: string;
}

export default function ProgressPage() {
  const { data: session } = useSession();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      try {
        if (session) {
          const { data, error } = await supabase
            .from("workouts")
            .select("*")
            .eq("userId", session.user.id);

          if (error) {
            setError(error.message);
          } else {
            setWorkouts(data);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, [session]);

  const handleWorkoutSubmit = (newWorkout: Workout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Progress</h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Loading Workouts...</p>}
      {!isLoading && (
        <>
          <WorkoutForm onSubmit={handleWorkoutSubmit} />
          <ProgressChart workouts={workouts} />
        </>
      )}
    </main>
  );
}

export const metadata = {
  title: "Progress - Fitness Tracker",
  description: "Track your workout progress and visualize achievements",
};