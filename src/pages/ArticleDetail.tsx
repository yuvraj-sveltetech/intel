import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Eye,
  Share2,
  Bookmark,
  ExternalLink,
  Calendar,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThreatLevel } from "../components/ui/ThreatLevel";
import { CategoryBadge } from "../components/ui/CategoryBadge";
import { mockArticles } from "../data/mockData";

export const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const article = mockArticles.find((a) => a.id === parseInt(id || "0"));

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="cyber-glass p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-cyber-text mb-4">
            Article Not Found
          </h2>
          <p className="text-cyber-muted mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/news" className="cyber-button">
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = mockArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.category === article.category || a.severity === article.severity)
    )
    .slice(0, 3);

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const publishedDate = new Date(date);
    const diffInHours = Math.floor(
      (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/news"
            className="inline-flex items-center space-x-2 text-cyber-blue hover:text-cyber-green transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="cyber-glass p-8"
            >
              {/* Article Header */}
              <div className="border-b border-cyber-blue/20 pb-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <ThreatLevel level={article.severity} />
                    <CategoryBadge category={article.category} />
                  </div>
                  <div className="flex items-center space-x-2 text-cyber-muted text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>

                <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-cyber-text mb-4 leading-tight">
                  {article.title}
                </h1>

                <p className="text-lg text-cyber-muted leading-relaxed mb-6">
                  {article.summary}
                </p>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-cyber-muted">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>
                      By{" "}
                      <span className="text-cyber-blue">{article.author}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>
                      Source:{" "}
                      <span className="text-cyber-blue">{article.source}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-cyber-text leading-relaxed space-y-6">
                  <p>
                    This critical vulnerability represents a significant threat
                    to organizations worldwide. Security researchers have
                    identified the flaw in widely-used software components that
                    could allow remote attackers to execute arbitrary code on
                    affected systems.
                  </p>

                  <h2 className="text-2xl font-bold text-cyber-text mt-8 mb-4">
                    Technical Analysis
                  </h2>
                  <p>
                    The vulnerability stems from improper input validation in
                    the affected software's network protocol handling routines.
                    Attackers can exploit this by sending specially crafted
                    network packets that trigger a buffer overflow condition.
                  </p>

                  <h2 className="text-2xl font-bold text-cyber-text mt-8 mb-4">
                    Impact Assessment
                  </h2>
                  <p>
                    Organizations using the affected software are at risk of
                    complete system compromise. The vulnerability allows for
                    remote code execution with system-level privileges,
                    potentially leading to data theft, system disruption, or
                    deployment of additional malware.
                  </p>

                  <h2 className="text-2xl font-bold text-cyber-text mt-8 mb-4">
                    Indicators of Compromise
                  </h2>
                  <div className="bg-cyber-surface/60 p-4 rounded-lg border border-cyber-blue/20">
                    <h3 className="text-cyber-green font-medium mb-2">
                      Network Indicators:
                    </h3>
                    <ul className="space-y-1 text-cyber-muted">
                      <li>• Unusual network traffic to external IPs</li>
                      <li>• Unexpected outbound connections on port 443</li>
                      <li>• DNS queries to suspicious domains</li>
                    </ul>
                  </div>

                  <h2 className="text-2xl font-bold text-cyber-text mt-8 mb-4">
                    Mitigation Strategies
                  </h2>
                  <p>
                    Immediate action is recommended for all organizations
                    running affected software versions. Apply the latest
                    security patches as soon as possible. In the interim,
                    consider implementing network-level protections and
                    monitoring for suspicious activity.
                  </p>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="border-t border-cyber-blue/20 pt-6 mt-8">
                  <h3 className="text-cyber-text font-medium mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue text-sm rounded-md border border-cyber-blue/20 hover:bg-cyber-blue/20 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="border-t border-cyber-blue/20 pt-6 mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 cyber-button">
                      <Bookmark className="h-4 w-4" />
                      <span>Bookmark</span>
                    </button>
                    <button className="flex items-center space-x-2 cyber-button">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 text-cyber-blue hover:text-cyber-green transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Original Source</span>
                  </button>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="cyber-glass p-6"
              >
                <h3 className="font-orbitron font-bold text-xl text-cyber-text mb-4">
                  Related <span className="text-gradient">Articles</span>
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <div
                      key={relatedArticle.id}
                      className="border-b border-cyber-blue/10 last:border-b-0 pb-4 last:pb-0"
                    >
                      <Link
                        to={`/article/${relatedArticle.id}`}
                        className="block group"
                      >
                        <div className="flex items-start space-x-3">
                          <ThreatLevel
                            level={relatedArticle.severity}
                            size="sm"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-cyber-text font-medium text-sm leading-snug group-hover:text-cyber-blue transition-colors line-clamp-2">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-cyber-muted text-xs mt-1">
                              {formatTimeAgo(relatedArticle.publishedAt)} •{" "}
                              {relatedArticle.source}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="cyber-glass p-6"
              >
                <h3 className="font-orbitron font-bold text-xl text-cyber-text mb-4">
                  Quick <span className="text-gradient">Stats</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-muted">Article Views</span>
                    <span className="text-cyber-blue font-medium">
                      {article.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-muted">Threat Level</span>
                    <ThreatLevel level={article.severity} size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-muted">Category</span>
                    <CategoryBadge category={article.category} size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-muted">Published</span>
                    <span className="text-cyber-text text-sm">
                      {formatTimeAgo(article.publishedAt)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
