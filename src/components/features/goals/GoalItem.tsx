"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/api/client";
import Button from "@/components/common/Button";
import EditGoalModal from "@/components/features/goals/EditGoalModal";

interface GoalItemProps {
  goal: {
    id: number;
    name: string;
    targetDate: string;
    outcome: string;
    userId: string;
  };
}

const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditGoal = () => {
    setIsEditing(true);
  };

  const handleDeleteGoal = async () => {
    try {
      if (session) {
        const { error } = await supabase
          .from("goals")
          .delete()
          .eq("id", goal.id);
        if (error) {
          console.error("Error deleting goal:", error);
        }
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <li className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold mb-2">{goal.name}</h3>
          <p className="text-gray-600">Target Date: {goal.targetDate}</p>
          <p className="text-gray-600">Outcome: {goal.outcome}</p>
        </div>
        <div>
          {session && (
            <>
              <Button onClick={handleEditGoal} className="mr-2">
                Edit
              </Button>
              <Button onClick={handleDeleteGoal} className="bg-red-500">
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      {isEditing && (
        <EditGoalModal goal={goal} onClose={() => setIsEditing(false)} />
      )}
    </li>
  );
};

export default GoalItem;