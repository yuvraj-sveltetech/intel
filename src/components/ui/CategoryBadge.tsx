import React from 'react';
import { Bug, Database, Brush as Virus, Mail, Brain } from 'lucide-react';

interface CategoryBadgeProps {
  category: 'vulnerability' | 'breach' | 'malware' | 'phishing' | 'intelligence';
  size?: 'sm' | 'md' | 'lg';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'md' }) => {
  const getIcon = () => {
    const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
    
    switch (category) {
      case 'vulnerability':
        return <Bug className={iconSize} />;
      case 'breach':
        return <Database className={iconSize} />;
      case 'malware':
        return <Virus className={iconSize} />;
      case 'phishing':
        return <Mail className={iconSize} />;
      case 'intelligence':
        return <Brain className={iconSize} />;
    }
  };

  const getLabel = () => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getClasses = () => {
    const baseClasses = `inline-flex items-center space-x-1 px-2 py-1 rounded-md border text-xs font-medium`;
    const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5' : size === 'lg' ? 'px-3 py-2 text-sm' : 'px-2 py-1';
    
    switch (category) {
      case 'vulnerability':
        return `${baseClasses} ${sizeClasses} category-vulnerability`;
      case 'breach':
        return `${baseClasses} ${sizeClasses} category-breach`;
      case 'malware':
        return `${baseClasses} ${sizeClasses} category-malware`;
      case 'phishing':
        return `${baseClasses} ${sizeClasses} category-phishing`;
      case 'intelligence':
        return `${baseClasses} ${sizeClasses} category-intelligence`;
    }
  };

  return (
    <span className={getClasses()}>
      {getIcon()}
      <span>{getLabel()}</span>
    </span>
  );
};