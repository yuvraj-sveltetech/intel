import React, { useState } from 'react';
import { Search, Calendar, Users, Building, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryBadge } from '../components/ui/CategoryBadge';

interface DataBreach {
  id: string;
  organization: string;
  sector: string;
  type: 'ransomware' | 'insider' | 'phishing' | 'malware' | 'physical';
  recordsAffected: number;
  description: string;
  dateDiscovered: string;
  dateReported: string;
  dataTypes: string[];
  status: 'ongoing' | 'contained' | 'resolved';
  impact: 'low' | 'medium' | 'high' | 'critical';
}

const mockBreaches: DataBreach[] = [
  {
    id: '1',
    organization: 'MedCorp Healthcare',
    sector: 'Healthcare',
    type: 'ransomware',
    recordsAffected: 2300000,
    description: 'Major healthcare provider suffered ransomware attack exposing patient medical records, social security numbers, and financial information.',
    dateDiscovered: '2024-01-10',
    dateReported: '2024-01-15',
    dataTypes: ['PHI', 'SSN', 'Financial', 'Medical Records'],
    status: 'contained',
    impact: 'critical'
  },
  {
    id: '2',
    organization: 'TechCorp International',
    sector: 'Technology',
    type: 'phishing',
    recordsAffected: 850000,
    description: 'Sophisticated phishing campaign targeted employees, leading to unauthorized access to customer database and internal systems.',
    dateDiscovered: '2024-01-08',
    dateReported: '2024-01-12',
    dataTypes: ['Email', 'Names', 'Phone Numbers', 'Addresses'],
    status: 'resolved',
    impact: 'high'
  },
  {
    id: '3',
    organization: 'Metro Bank',
    sector: 'Financial',
    type: 'malware',
    recordsAffected: 1200000,
    description: 'Banking malware infiltrated internal networks, compromising customer account information and transaction data.',
    dateDiscovered: '2024-01-05',
    dateReported: '2024-01-09',
    dataTypes: ['Account Numbers', 'Transaction History', 'PII', 'Financial Data'],
    status: 'ongoing',
    impact: 'critical'
  },
  {
    id: '4',
    organization: 'EduTech Solutions',
    sector: 'Education',
    type: 'insider',
    recordsAffected: 500000,
    description: 'Insider threat resulted in unauthorized access to student records and faculty information across multiple institutions.',
    dateDiscovered: '2024-01-03',
    dateReported: '2024-01-07',
    dataTypes: ['Student Records', 'Faculty Info', 'Academic Data', 'Contact Info'],
    status: 'resolved',
    impact: 'medium'
  },
  {
    id: '5',
    organization: 'RetailGiant Corp',
    sector: 'Retail',
    type: 'physical',
    recordsAffected: 300000,
    description: 'Physical breach of data center led to theft of backup drives containing customer payment information.',
    dateDiscovered: '2024-01-01',
    dateReported: '2024-01-05',
    dataTypes: ['Payment Cards', 'Customer Info', 'Purchase History'],
    status: 'contained',
    impact: 'high'
  }
];

export const Breaches: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState('dateReported');

  const sectors = ['all', ...Array.from(new Set(mockBreaches.map(b => b.sector)))];
  const types = ['all', 'ransomware', 'insider', 'phishing', 'malware', 'physical'];
  const statuses = ['all', 'ongoing', 'contained', 'resolved'];

  const filteredBreaches = mockBreaches.filter(breach => {
    const matchesSearch = breach.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breach.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breach.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || breach.sector === selectedSector;
    const matchesType = selectedType === 'all' || breach.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || breach.status === selectedStatus;
    
    return matchesSearch && matchesSector && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'contained': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'resolved': return 'text-green-400 bg-green-500/20 border-green-500/50';
      default: return 'text-cyber-muted bg-cyber-surface border-cyber-blue/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-cyber-muted';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
              Data <span className="text-gradient">Breaches</span>
            </h1>
            <p className="text-cyber-muted text-lg max-w-2xl">
              Real-time tracking of data breaches and security incidents across all sectors with detailed impact analysis.
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
                  placeholder="Search organizations, sectors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 cyber-input"
                />
              </div>
            </div>

            {/* Sector Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Sectors</option>
                {sectors.slice(1).map(sector => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Types</option>
                {types.slice(1).map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Status</option>
                {statuses.slice(1).map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="dateReported">Latest</option>
                <option value="recordsAffected">Records</option>
                <option value="impact">Impact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-cyber-muted">
            Showing <span className="text-cyber-blue font-medium">{filteredBreaches.length}</span> data breaches
          </p>
        </div>

        {/* Breaches Grid */}
        {filteredBreaches.length > 0 ? (
          <div className="space-y-6">
            {filteredBreaches.map((breach, index) => (
              <motion.div
                key={breach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cyber-glass p-6 hover:shadow-cyber-purple-glow transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Organization Info */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Building className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-cyber-text mb-1">
                          {breach.organization}
                        </h3>
                        <p className="text-cyber-blue text-sm font-medium mb-2">
                          {breach.sector}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(breach.status)}`}>
                            {breach.status.charAt(0).toUpperCase() + breach.status.slice(1)}
                          </span>
                          <CategoryBadge category="breach" size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Stats */}
                  <div className="lg:col-span-3">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-cyber-muted" />
                        <span className="text-cyber-text font-medium">
                          {formatNumber(breach.recordsAffected)} records
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-cyber-muted" />
                        <span className={`font-medium ${getImpactColor(breach.impact)}`}>
                          {breach.impact.charAt(0).toUpperCase() + breach.impact.slice(1)} Impact
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-cyber-muted" />
                        <span className="text-cyber-muted text-sm">
                          Reported: {formatDate(breach.dateReported)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-5">
                    <p className="text-cyber-muted mb-4 leading-relaxed">
                      {breach.description}
                    </p>
                    
                    {/* Data Types */}
                    <div className="space-y-2">
                      <span className="text-cyber-text text-sm font-medium">Data Types Affected:</span>
                      <div className="flex flex-wrap gap-2">
                        {breach.dataTypes.map((dataType) => (
                          <span
                            key={dataType}
                            className="px-2 py-1 bg-cyber-purple/20 text-cyber-purple text-xs rounded-md border border-cyber-purple/30"
                          >
                            {dataType}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="cyber-glass p-8 max-w-md mx-auto">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-cyber-muted opacity-50" />
              <h3 className="text-lg font-medium text-cyber-text mb-2">No breaches found</h3>
              <p className="text-cyber-muted text-sm mb-4">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSector('all');
                  setSelectedType('all');
                  setSelectedStatus('all');
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