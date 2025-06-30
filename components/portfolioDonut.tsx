// components/PortfolioDonut.tsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Slice = { name: string; value: number };

// A simple color palette
const COLORS = ["#4C51BF", "#6B46C1", "#ED64A6", "#F6E05E"];

// Mock data for portfolio chart
const mockData: Slice[] = [
  { name: "Startup", value: 45000 },
  { name: "Token", value: 28000 },
  { name: "Game", value: 32000 },
  { name: "Property", value: 15000 },
];

export default function PortfolioDonut() {
  // Use mock data instead of API call for now
  const data = mockData;
  
  // Uncomment below to use real API when ready
  // const { data, error } = useSWR<Slice[]>("/api/portfolio", (url: string) =>
  //   fetch(url).then((res) => res.json())
  // );

  // if (error) return <div className="text-red-500">Error loading data.</div>;
  // if (!data) return <div>Loading portfolio…</div>;
  // if (!Array.isArray(data)) return <div className="text-red-500">Invalid data format.</div>;
  if (data.length === 0) return <div>No investments yet.</div>;

  const total = data.reduce((sum: number, slice: Slice) => sum + slice.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Your Portfolio</h2>
      <div className="text-3xl font-bold mb-4">${total.toLocaleString()}</div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={4}
            labelLine={false}
            label={({ percent, name }) =>
              `${name}: ${(percent! * 100).toFixed(0)}%`
            }
          >
            {data.map((_: Slice, index: number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
