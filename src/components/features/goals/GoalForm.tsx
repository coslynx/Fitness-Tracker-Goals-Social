"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/api/client";
import Button from "@/components/common/Button";

interface GoalFormProps {
  onSubmit: (goal: { name: string; targetDate: string; outcome: string }) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [outcome, setOutcome] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!name || !targetDate || !outcome) {
        setError("Please fill in all fields.");
        return;
      }

      const { error } = await supabase
        .from("goals")
        .insert({ name, targetDate, outcome, userId: session.user.id });

      if (error) {
        setError("Failed to create goal. Please try again.");
      } else {
        onSubmit({ name, targetDate, outcome });
        setName("");
        setTargetDate("");
        setOutcome("");
        setError(null);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Goal Name:
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="targetDate" className="block text-gray-700 font-bold mb-2">
          Target Date:
        </label>
        <input
          type="date"
          id="targetDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="outcome" className="block text-gray-700 font-bold mb-2">
          Desired Outcome:
        </label>
        <textarea
          id="outcome"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
        />
      </div>
      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Goal
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default GoalForm;