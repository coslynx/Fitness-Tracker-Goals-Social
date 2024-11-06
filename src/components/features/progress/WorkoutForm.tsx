"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/api/client";
import Button from "@/components/common/Button";
import ProgressChart from "@/components/features/progress/ProgressChart";

interface Workout {
  id: number;
  activity: string;
  duration: number;
  metrics: number;
  date: string;
  userId: string;
}

interface WorkoutFormProps {
  onSubmit: (newWorkout: Workout) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
  const { data: session } = useSession();
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [metrics, setMetrics] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!activity || !duration || !metrics || !date) {
        setError("Please fill in all fields.");
        return;
      }

      const parsedDuration = parseFloat(duration);
      const parsedMetrics = parseFloat(metrics);

      if (isNaN(parsedDuration) || parsedDuration <= 0) {
        setError("Invalid duration. Please enter a valid number.");
        return;
      }

      if (isNaN(parsedMetrics) || parsedMetrics <= 0) {
        setError("Invalid metrics. Please enter a valid number.");
        return;
      }

      const { error } = await supabase
        .from("workouts")
        .insert({
          activity,
          duration: parsedDuration,
          metrics: parsedMetrics,
          date,
          userId: session.user.id,
        });

      if (error) {
        setError("Failed to log workout. Please try again.");
      } else {
        onSubmit({
          activity,
          duration: parsedDuration,
          metrics: parsedMetrics,
          date,
          userId: session.user.id,
          id: 0,
        });
        setActivity("");
        setDuration("");
        setMetrics("");
        setError(null);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="activity" className="block text-gray-700 font-bold mb-2">
          Activity:
        </label>
        <input
          type="text"
          id="activity"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
          Duration (minutes):
        </label>
        <input
          type="number"
          id="duration"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="metrics" className="block text-gray-700 font-bold mb-2">
          Metrics (e.g., distance in km):
        </label>
        <input
          type="number"
          id="metrics"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={metrics}
          onChange={(e) => setMetrics(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Date:
        </label>
        <input
          type="date"
          id="date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Log Workout
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default WorkoutForm;