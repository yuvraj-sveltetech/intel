import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Share2, Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThreatLevel } from './ThreatLevel';
import { CategoryBadge } from './CategoryBadge';
import type { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index = 0 }) => {
  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const publishedDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cyber-glass hover:shadow-cyber-purple-glow transition-all duration-300 group overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyber-blue/20">
        <div className="flex items-center space-x-3">
          <ThreatLevel level={article.severity} size="sm" />
          <CategoryBadge category={article.category} size="sm" />
        </div>
        <div className="flex items-center space-x-2 text-cyber-muted text-sm">
          <Clock className="h-3 w-3" />
          <span>{formatTimeAgo(article.publishedAt)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/article/${article.id}`} className="block mb-3 group-hover:text-cyber-blue transition-colors">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-cyber-muted mb-4 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-cyber-blue/10 text-cyber-blue text-xs rounded-md border border-cyber-blue/20"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-cyber-muted text-xs">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Source */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-cyber-muted text-sm">
              Source: <span className="text-cyber-blue">{article.source}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-cyber-muted">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span className="text-sm">{article.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 border-t border-cyber-blue/20 bg-cyber-surface/30">
        <div className="flex items-center justify-between">
          <Link 
            to={`/article/${article.id}`}
            className="flex items-center space-x-2 text-cyber-blue hover:text-cyber-green transition-colors text-sm font-medium"
          >
            <span>Read More</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          
          <div className="flex items-center space-x-3">
            <button className="text-cyber-muted hover:text-cyber-blue transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="text-cyber-muted hover:text-cyber-blue transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};