import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  index?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon,
  trend,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cyber-glass p-6 hover:shadow-cyber-glow transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyber-blue/20 rounded-lg group-hover:bg-cyber-blue/30 transition-colors">
            <Icon className="h-6 w-6 text-cyber-blue" />
          </div>
          <div>
            <p className="text-cyber-muted text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-cyber-text group-hover:text-gradient transition-all duration-300">
              {value}
            </p>
          </div>
        </div>

        {trend && (
          <div
            className={`flex items-center space-x-1 text-sm ${
              trend.isUp ? "text-green-400" : "text-red-400"
            }`}
          >
            <span>{trend.isUp ? "↗" : "↘"}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
