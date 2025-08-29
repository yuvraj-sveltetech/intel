import React, { useState } from 'react';
import { Search, Globe, Target, Users, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThreatLevel } from '../components/ui/ThreatLevel';

interface ThreatIntelligence {
  id: string;
  title: string;
  description: string;
  threatActor: string;
  campaign: string;
  targets: string[];
  geography: string[];
  tactics: string[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: 'high' | 'medium' | 'low';
  publishedDate: string;
  lastUpdated: string;
  iocs: string[];
  mitreAttack: string[];
}

const mockIntelligence: ThreatIntelligence[] = [
  {
    id: '1',
    title: 'APT29 Targeting Cloud Infrastructure with Living-off-the-Land Techniques',
    description: 'Russian APT29 group observed using legitimate administrative tools and cloud services to maintain persistence and evade detection in government and enterprise networks.',
    threatActor: 'APT29 (Cozy Bear)',
    campaign: 'CloudStrike 2024',
    targets: ['Government', 'Defense Contractors', 'Think Tanks'],
    geography: ['United States', 'Europe', 'Canada'],
    tactics: ['Living off the Land', 'Cloud Exploitation', 'Supply Chain'],
    severity: 'high',
    confidence: 'high',
    publishedDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    iocs: ['185.220.100.240', 'cloudservice-update.com', 'SHA256:a1b2c3d4...'],
    mitreAttack: ['T1078', 'T1566', 'T1059']
  },
  {
    id: '2',
    title: 'Lazarus Group Cryptocurrency Exchange Targeting Campaign',
    description: 'North Korean Lazarus Group continues sophisticated attacks against cryptocurrency exchanges using zero-day exploits and social engineering tactics.',
    threatActor: 'Lazarus Group',
    campaign: 'CryptoHeist 2024',
    targets: ['Cryptocurrency Exchanges', 'DeFi Platforms', 'Wallet Providers'],
    geography: ['South Korea', 'Japan', 'United States'],
    tactics: ['Zero-day Exploits', 'Social Engineering', 'Supply Chain'],
    severity: 'critical',
    confidence: 'high',
    publishedDate: '2024-01-14',
    lastUpdated: '2024-01-15',
    iocs: ['203.248.252.2', 'crypto-update.net', 'SHA256:e5f6g7h8...'],
    mitreAttack: ['T1566.001', 'T1204', 'T1055']
  },
  {
    id: '3',
    title: 'Chinese APT40 Maritime Industry Espionage Campaign',
    description: 'APT40 group targeting maritime industries and port authorities to gather intelligence on shipping routes and cargo manifests.',
    threatActor: 'APT40 (Leviathan)',
    campaign: 'DeepWater',
    targets: ['Maritime Companies', 'Port Authorities', 'Shipping Lines'],
    geography: ['Southeast Asia', 'Australia', 'Europe'],
    tactics: ['Spear Phishing', 'Watering Hole', 'Credential Harvesting'],
    severity: 'medium',
    confidence: 'medium',
    publishedDate: '2024-01-13',
    lastUpdated: '2024-01-14',
    iocs: ['192.168.1.100', 'maritime-portal.org', 'SHA256:i9j0k1l2...'],
    mitreAttack: ['T1566.002', 'T1189', 'T1003']
  },
  {
    id: '4',
    title: 'Scattered Spider Targeting Cloud Service Providers',
    description: 'Scattered Spider cybercriminal group using SIM swapping and social engineering to compromise cloud service provider accounts.',
    threatActor: 'Scattered Spider',
    campaign: 'CloudBreach 2024',
    targets: ['Cloud Providers', 'Telecommunications', 'IT Services'],
    geography: ['United States', 'United Kingdom', 'Canada'],
    tactics: ['SIM Swapping', 'Social Engineering', 'MFA Bypass'],
    severity: 'high',
    confidence: 'high',
    publishedDate: '2024-01-12',
    lastUpdated: '2024-01-13',
    iocs: ['172.16.0.1', 'cloud-support.net', 'SHA256:m3n4o5p6...'],
    mitreAttack: ['T1111', 'T1621', 'T1556']
  }
];

export const Intelligence: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedConfidence, setSelectedConfidence] = useState<string>('all');
  const [selectedActor, setSelectedActor] = useState<string>('all');
  const [sortBy, setSortBy] = useState('publishedDate');

  const severities = ['all', 'critical', 'high', 'medium', 'low'];
  const confidences = ['all', 'high', 'medium', 'low'];
  const actors = ['all', ...Array.from(new Set(mockIntelligence.map(i => i.threatActor)))];

  const filteredIntelligence = mockIntelligence.filter(intel => {
    const matchesSearch = intel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intel.threatActor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intel.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intel.targets.some(target => target.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity = selectedSeverity === 'all' || intel.severity === selectedSeverity;
    const matchesConfidence = selectedConfidence === 'all' || intel.confidence === selectedConfidence;
    const matchesActor = selectedActor === 'all' || intel.threatActor === selectedActor;
    
    return matchesSearch && matchesSeverity && matchesConfidence && matchesActor;
  });

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-red-400 bg-red-500/20 border-red-500/50';
      default: return 'text-cyber-muted bg-cyber-surface border-cyber-blue/20';
    }
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
              Threat <span className="text-gradient">Intelligence</span>
            </h1>
            <p className="text-cyber-muted text-lg max-w-2xl">
              Advanced persistent threat (APT) tracking, campaign analysis, and strategic intelligence on nation-state and cybercriminal activities.
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
                  placeholder="Search threat actors, campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 cyber-input"
                />
              </div>
            </div>

            {/* Actor Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedActor}
                onChange={(e) => setSelectedActor(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Threat Actors</option>
                {actors.slice(1).map(actor => (
                  <option key={actor} value={actor}>
                    {actor}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Severities</option>
                {severities.slice(1).map(severity => (
                  <option key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Confidence Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedConfidence}
                onChange={(e) => setSelectedConfidence(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Confidence</option>
                {confidences.slice(1).map(confidence => (
                  <option key={confidence} value={confidence}>
                    {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
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
                <option value="publishedDate">Latest</option>
                <option value="severity">Severity</option>
                <option value="confidence">Confidence</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-cyber-muted">
            Showing <span className="text-cyber-blue font-medium">{filteredIntelligence.length}</span> intelligence reports
          </p>
        </div>

        {/* Intelligence Reports */}
        {filteredIntelligence.length > 0 ? (
          <div className="space-y-8">
            {filteredIntelligence.map((intel, index) => (
              <motion.div
                key={intel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cyber-glass p-6 hover:shadow-cyber-green-glow transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <ThreatLevel level={intel.severity} />
                      <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getConfidenceColor(intel.confidence)}`}>
                        {intel.confidence.charAt(0).toUpperCase() + intel.confidence.slice(1)} Confidence
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-cyber-text mb-2">
                      {intel.title}
                    </h2>
                    <p className="text-cyber-muted mb-4 leading-relaxed">
                      {intel.description}
                    </p>
                  </div>
                  <div className="ml-6 text-right">
                    <div className="flex items-center space-x-1 text-cyber-muted text-sm mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(intel.publishedDate)}</span>
                    </div>
                    <button className="text-cyber-blue hover:text-cyber-green transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Threat Actor */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-cyber-blue" />
                      <span className="text-cyber-text font-medium text-sm">Threat Actor</span>
                    </div>
                    <p className="text-cyber-blue font-medium">{intel.threatActor}</p>
                    <p className="text-cyber-muted text-sm">Campaign: {intel.campaign}</p>
                  </div>

                  {/* Targets */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-4 w-4 text-cyber-green" />
                      <span className="text-cyber-text font-medium text-sm">Primary Targets</span>
                    </div>
                    <div className="space-y-1">
                      {intel.targets.slice(0, 2).map((target) => (
                        <span key={target} className="block text-cyber-green text-sm">
                          {target}
                        </span>
                      ))}
                      {intel.targets.length > 2 && (
                        <span className="text-cyber-muted text-xs">
                          +{intel.targets.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Geography */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-cyber-purple" />
                      <span className="text-cyber-text font-medium text-sm">Geography</span>
                    </div>
                    <div className="space-y-1">
                      {intel.geography.slice(0, 2).map((geo) => (
                        <span key={geo} className="block text-cyber-purple text-sm">
                          {geo}
                        </span>
                      ))}
                      {intel.geography.length > 2 && (
                        <span className="text-cyber-muted text-xs">
                          +{intel.geography.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* MITRE ATT&CK */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-cyber-text font-medium text-sm">MITRE ATT&CK</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {intel.mitreAttack.slice(0, 3).map((technique) => (
                        <span
                          key={technique}
                          className="px-2 py-1 bg-cyber-blue/20 text-cyber-blue text-xs rounded border border-cyber-blue/30"
                        >
                          {technique}
                        </span>
                      ))}
                      {intel.mitreAttack.length > 3 && (
                        <span className="text-cyber-muted text-xs self-center">
                          +{intel.mitreAttack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tactics */}
                <div className="mb-4">
                  <span className="text-cyber-text font-medium text-sm mb-2 block">Tactics & Techniques:</span>
                  <div className="flex flex-wrap gap-2">
                    {intel.tactics.map((tactic) => (
                      <span
                        key={tactic}
                        className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-md border border-orange-500/30"
                      >
                        {tactic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* IOCs Preview */}
                <div>
                  <span className="text-cyber-text font-medium text-sm mb-2 block">Indicators of Compromise (IOCs):</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {intel.iocs.slice(0, 3).map((ioc, iocIndex) => (
                      <code
                        key={iocIndex}
                        className="text-xs bg-cyber-surface/60 text-cyber-green px-2 py-1 rounded border border-cyber-green/30 break-all"
                      >
                        {ioc}
                      </code>
                    ))}
                  </div>
                  {intel.iocs.length > 3 && (
                    <p className="text-cyber-muted text-xs mt-2">
                      +{intel.iocs.length - 3} more IOCs available
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="cyber-glass p-8 max-w-md mx-auto">
              <Target className="h-12 w-12 mx-auto mb-4 text-cyber-muted opacity-50" />
              <h3 className="text-lg font-medium text-cyber-text mb-2">No intelligence found</h3>
              <p className="text-cyber-muted text-sm mb-4">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSeverity('all');
                  setSelectedConfidence('all');
                  setSelectedActor('all');
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