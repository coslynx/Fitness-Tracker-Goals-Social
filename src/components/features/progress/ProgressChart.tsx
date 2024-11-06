"use client";

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, PointElement, LineController, LineElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { supabase } from "@/lib/api/client";
import { useSession } from "next-auth/react";
import { formatDate, formatMetric } from "@/lib/utils/formatters";

ChartJS.register(CategoryScale, PointElement, LineController, LineElement, Title, Tooltip);

interface Workout {
  id: number;
  activity: string;
  duration: number;
  metrics: number;
  date: string;
  userId: string;
}

const ProgressChart: React.FC<{ workouts: Workout[] }> = ({ workouts }) => {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<ChartJS.ChartData<'line', number[]>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const getChartData = (workouts: Workout[]): ChartJS.ChartData<'line', number[]> => {
      const labels = workouts.map((workout) => formatDate(workout.date));
      const metrics = workouts.map((workout) => workout.metrics);

      return {
        labels,
        datasets: [
          {
            label: "Total Distance (km)",
            data: metrics,
            borderColor: "blue",
            borderWidth: 1,
            tension: 0.4,
          },
        ],
      };
    };

    if (session) {
      setChartData(getChartData(workouts));
    }
  }, [session, workouts]);

  return (
    <div className="mt-4">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Workout Progress",
              font: {
                size: 18,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Distance (km)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ProgressChart;