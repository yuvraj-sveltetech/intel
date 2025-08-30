import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X, Shield, Bug, Database, Brain, Zap, Lock, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navigationItems = [
    { path: '/news', label: 'News', icon: Zap },
    { path: '/vulnerabilities', label: 'CVEs', icon: Bug },
    { path: '/breaches', label: 'Breaches', icon: Database },
    { path: '/intelligence', label: 'Intel', icon: Brain },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 cyber-glass border-b border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-cyber-blue group-hover:animate-pulse-glow" />
              <div className="absolute inset-0 bg-cyber-blue/20 rounded-full animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-xl text-gradient">
                ZeroIntel
              </span>
              <span className="text-xs text-cyber-muted hidden sm:block">
                Real-time Threat Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(path)
                    ? 'bg-cyber-blue/20 text-cyber-blue shadow-cyber-glow'
                    : 'text-cyber-text hover:text-cyber-blue hover:bg-cyber-surface/60'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="cyber-button p-2"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="cyber-button p-2 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
            </div>

            {/* Phone Number Display - Only show when authenticated */}
            {isAuthenticated && (
              <div className="flex items-center">
                <span className="text-cyber-text text-sm hidden sm:block">
                  {user?.phoneNumber}
                </span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden cyber-button p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cyber-blue/20 bg-cyber-surface/90 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-muted" />
                <input
                  type="text"
                  placeholder="Search threats, vulnerabilities, IOCs..."
                  className="w-full pl-10 pr-4 py-3 bg-cyber-surface border border-cyber-blue/30 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none focus:border-cyber-blue focus:shadow-cyber-glow"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-cyber-blue/20 bg-cyber-surface/90 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(path)
                      ? 'bg-cyber-blue/20 text-cyber-blue shadow-cyber-glow'
                      : 'text-cyber-text hover:text-cyber-blue hover:bg-cyber-surface/60'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
              
              {/* Mobile Phone Number Display - Only show when authenticated */}
              {isAuthenticated && (
                <div className="border-t border-cyber-blue/20 pt-4">
                  <div className="px-4 py-2 text-sm text-cyber-muted">
                    {user?.phoneNumber}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};