import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Eye, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { ArticleCard } from '../components/ui/ArticleCard';
import { StatsCard } from '../components/ui/StatsCard';
import { mockArticles, mockStats } from '../data/mockData';

export const Home: React.FC = () => {
  const featuredArticles = mockArticles.slice(0, 6);
  const breakingNews = mockArticles.filter(article => 
    article.severity === 'critical' || article.severity === 'high'
  ).slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-6">
                <span className="text-gradient animate-gradient-shift">Zero</span>
                <span className="text-cyber-text">Intel</span>
                <span className="text-cyber-blue animate-pulse">.</span>
                <span className="text-cyber-green">io</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-cyber-muted mb-8 max-w-3xl mx-auto leading-relaxed">
                Real-time Cybersecurity Intelligence Platform
              </p>
              
              <div className="text-lg text-cyber-text/80 mb-12 max-w-4xl mx-auto">
                Monitor global cyber threats, track vulnerabilities, and stay ahead of emerging attacks 
                with our comprehensive intelligence platform.
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link to="/news" className="cyber-button text-lg px-8 py-4">
                  Explore Threats
                </Link>
                <button className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-bg font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-cyber-glow hover:-translate-y-0.5">
                  Watch Demo
                </button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <StatsCard
                label="Threats Monitored"
                value={mockStats.threatsMonitored}
                icon={Shield}
                index={0}
              />
              <StatsCard
                label="Intelligence Sources"
                value={mockStats.sources}
                icon={Eye}
                trend={{ value: 12, isUp: true }}
                index={1}
              />
              <StatsCard
                label="Daily Updates"
                value={mockStats.dailyUpdates}
                icon={TrendingUp}
                trend={{ value: 8, isUp: true }}
                index={2}
              />
              <StatsCard
                label="Active Campaigns"
                value={mockStats.activeCampaigns}
                icon={AlertTriangle}
                trend={{ value: 3, isUp: false }}
                index={3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Breaking News Ticker */}
      <section className="border-y border-cyber-blue/20 bg-cyber-surface/40 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-red-400 font-semibold">
              <Zap className="h-5 w-5 animate-pulse" />
              <span>BREAKING</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {breakingNews.map((article, index) => (
                  <span key={article.id} className="inline-block mr-8">
                    <Link 
                      to={`/article/${article.id}`}
                      className="text-cyber-text hover:text-cyber-blue transition-colors"
                    >
                      {article.title}
                    </Link>
                    {index < breakingNews.length - 1 && (
                      <span className="mx-4 text-cyber-blue">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-cyber-text mb-4">
                Latest <span className="text-gradient">Intelligence</span>
              </h2>
              <p className="text-cyber-muted text-lg">
                Stay informed with the latest cybersecurity threats and intelligence reports
              </p>
            </div>
            <Link 
              to="/news" 
              className="cyber-button hidden md:inline-flex items-center space-x-2"
            >
              <span>View All</span>
              <Clock className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link to="/news" className="cyber-button">
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Threat Categories */}
      <section className="py-16 bg-cyber-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-cyber-text mb-4">
              Threat <span className="text-gradient">Categories</span>
            </h2>
            <p className="text-cyber-muted text-lg max-w-2xl mx-auto">
              Explore different types of cybersecurity threats and intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Vulnerabilities', 
                description: 'CVEs and security flaws',
                link: '/vulnerabilities',
                color: 'red',
                count: '1,247'
              },
              { 
                title: 'Data Breaches', 
                description: 'Incident reports and analysis',
                link: '/breaches',
                color: 'purple',
                count: '89'
              },
              { 
                title: 'Malware', 
                description: 'Threat analysis and IOCs',
                link: '/news?category=malware',
                color: 'orange',
                count: '2,156'
              },
              { 
                title: 'Intelligence', 
                description: 'APT and nation-state activity',
                link: '/intelligence',
                color: 'blue',
                count: '432'
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={category.link}
                  className="block cyber-glass p-6 hover:shadow-cyber-glow transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${category.color}-500/20 mb-4 group-hover:bg-${category.color}-500/30 transition-colors`}>
                      <span className={`text-2xl font-bold text-${category.color}-400`}>
                        {category.count}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-cyber-text mb-2 group-hover:text-gradient transition-all duration-300">
                      {category.title}
                    </h3>
                    <p className="text-cyber-muted text-sm">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};