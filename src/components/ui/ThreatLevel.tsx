import React from 'react';
import { AlertTriangle, Shield, AlertCircle, Info, Zap } from 'lucide-react';

interface ThreatLevelProps {
  level: 'critical' | 'high' | 'medium' | 'low' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const ThreatLevel: React.FC<ThreatLevelProps> = ({ level, size = 'md' }) => {
  const getIcon = () => {
    switch (level) {
      case 'critical':
        return <Zap className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'}`} />;
      case 'high':
        return <AlertTriangle className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'}`} />;
      case 'medium':
        return <AlertCircle className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'}`} />;
      case 'low':
        return <Shield className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'}`} />;
      case 'info':
        return <Info className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'}`} />;
    }
  };

  const getLabel = () => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const getClasses = () => {
    const baseClasses = `inline-flex items-center space-x-1 px-2 py-1 rounded-md border text-xs font-medium`;
    const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5' : size === 'lg' ? 'px-3 py-2 text-sm' : 'px-2 py-1';
    
    switch (level) {
      case 'critical':
        return `${baseClasses} ${sizeClasses} bg-red-500/20 border-red-500/50 text-red-400 animate-pulse-glow`;
      case 'high':
        return `${baseClasses} ${sizeClasses} bg-orange-500/20 border-orange-500/50 text-orange-400`;
      case 'medium':
        return `${baseClasses} ${sizeClasses} bg-yellow-500/20 border-yellow-500/50 text-yellow-400`;
      case 'low':
        return `${baseClasses} ${sizeClasses} bg-green-500/20 border-green-500/50 text-green-400`;
      case 'info':
        return `${baseClasses} ${sizeClasses} bg-blue-500/20 border-blue-500/50 text-blue-400`;
    }
  };

  return (
    <span className={getClasses()}>
      {getIcon()}
      <span>{getLabel()}</span>
    </span>
  );
};