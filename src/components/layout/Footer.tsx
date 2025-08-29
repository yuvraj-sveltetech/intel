import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-cyber-surface/60 border-t border-cyber-blue/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="font-orbitron font-bold text-xl text-gradient">
                ZeroIntel
              </span>
            </div>
            <p className="text-cyber-muted mb-6 max-w-md">
              Real-time cybersecurity intelligence platform providing comprehensive 
              threat analysis, vulnerability tracking, and breach monitoring for 
              security professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-cyber-text mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link to="/vulnerabilities" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  Vulnerabilities
                </Link>
              </li>
              <li>
                <Link to="/breaches" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  Data Breaches
                </Link>
              </li>
              <li>
                <Link to="/intelligence" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  Threat Intel
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-cyber-text mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  RSS Feeds
                </a>
              </li>
              <li>
                <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  Security Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-cyber-muted hover:text-cyber-blue transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyber-blue/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyber-muted text-sm">
            © 2024 ZeroIntel.io. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-cyber-muted hover:text-cyber-blue text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-blue text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-cyber-muted hover:text-cyber-blue text-sm transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};