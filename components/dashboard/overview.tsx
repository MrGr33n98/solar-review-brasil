'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: '01/06',
    total: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: '07/06',
    total: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: '14/06',
    total: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: '21/06',
    total: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: '28/06',
    total: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: '05/07',
    total: Math.floor(Math.random() * 100) + 20,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#2563eb"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
