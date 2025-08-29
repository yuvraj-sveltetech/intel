import React, { useState } from "react";
import { Search, SortDesc } from "lucide-react";
import { motion } from "framer-motion";
import { ArticleCard } from "../components/ui/ArticleCard";
import { CategoryBadge } from "../components/ui/CategoryBadge";
import { ThreatLevel } from "../components/ui/ThreatLevel";
import { mockArticles } from "../data/mockData";

export const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [sortBy, setSortBy] = useState("date");

  const categories = [
    "all",
    "vulnerability",
    "breach",
    "malware",
    "phishing",
    "intelligence",
  ];
  const severities = ["all", "critical", "high", "medium", "low", "info"];

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSeverity =
      selectedSeverity === "all" || article.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      case "views":
        return b.views - a.views;
      case "severity":
        const severityOrder = {
          critical: 4,
          high: 3,
          medium: 2,
          low: 1,
          info: 0,
        };
        return severityOrder[b.severity] - severityOrder[a.severity];
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-cyber-text mb-4">
              Cyber <span className="text-gradient">News Feed</span>
            </h1>
            <p className="text-cyber-muted text-lg max-w-2xl">
              Real-time cybersecurity news, threat intelligence, and
              vulnerability reports from trusted sources worldwide.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="cyber-glass p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search */}
            <div className="lg:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-muted" />
                <input
                  type="text"
                  placeholder="Search articles, tags, IOCs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 cyber-input"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Severities</option>
                {severities.slice(1).map((severity) => (
                  <option key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="date">Latest</option>
                <option value="views">Most Viewed</option>
                <option value="severity">Severity</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "all" ||
            selectedSeverity !== "all" ||
            searchTerm) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-cyber-blue/20">
              <span className="text-cyber-muted text-sm">Active filters:</span>
              {searchTerm && (
                <div className="flex items-center space-x-2 bg-cyber-blue/20 px-3 py-1 rounded-md">
                  <span className="text-cyber-blue text-sm">
                    Search: "{searchTerm}"
                  </span>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-cyber-blue hover:text-cyber-green"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedCategory !== "all" && (
                <div className="flex items-center space-x-2">
                  <CategoryBadge category={selectedCategory as any} size="sm" />
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="text-cyber-muted hover:text-cyber-blue"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedSeverity !== "all" && (
                <div className="flex items-center space-x-2">
                  <ThreatLevel level={selectedSeverity as any} size="sm" />
                  <button
                    onClick={() => setSelectedSeverity("all")}
                    className="text-cyber-muted hover:text-cyber-blue"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-cyber-muted">
            Showing{" "}
            <span className="text-cyber-blue font-medium">
              {sortedArticles.length}
            </span>{" "}
            articles
          </p>
          <div className="flex items-center space-x-2 text-cyber-muted">
            <SortDesc className="h-4 w-4" />
            <span className="text-sm">Sorted by {sortBy}</span>
          </div>
        </div>

        {/* Articles Grid */}
        {sortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="cyber-glass p-8 max-w-md mx-auto">
              <div className="text-cyber-muted mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-cyber-text mb-2">
                  No articles found
                </h3>
                <p className="text-sm">
                  Try adjusting your search terms or filters to find more
                  results.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedSeverity("all");
                }}
                className="cyber-button"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
