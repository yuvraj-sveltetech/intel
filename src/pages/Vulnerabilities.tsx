import React, { useState } from "react";
import { Search, ExternalLink, Calendar, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { ThreatLevel } from "../components/ui/ThreatLevel";

interface Vulnerability {
  id: string;
  cve: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  cvssScore: number;
  vendor: string;
  product: string;
  publishedDate: string;
  lastModified: string;
  patchStatus: "available" | "pending" | "none";
  references: string[];
}

const mockVulnerabilities: Vulnerability[] = [
  {
    id: "1",
    cve: "CVE-2024-0001",
    title: "Remote Code Execution in WebRTC Implementation",
    description:
      "A critical vulnerability in WebRTC allows remote attackers to execute arbitrary code through specially crafted media streams.",
    severity: "critical",
    cvssScore: 9.8,
    vendor: "Google",
    product: "Chrome, WebRTC",
    publishedDate: "2024-01-15",
    lastModified: "2024-01-15",
    patchStatus: "available",
    references: [
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0001",
    ],
  },
  {
    id: "2",
    cve: "CVE-2024-0002",
    title: "SQL Injection in Healthcare Management System",
    description:
      "Multiple SQL injection vulnerabilities in popular healthcare management software could allow unauthorized access to patient data.",
    severity: "high",
    cvssScore: 8.1,
    vendor: "MedSoft Inc.",
    product: "HealthManager Pro",
    publishedDate: "2024-01-14",
    lastModified: "2024-01-15",
    patchStatus: "pending",
    references: [
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0002",
    ],
  },
  {
    id: "3",
    cve: "CVE-2024-0003",
    title: "Buffer Overflow in Network Appliance Firmware",
    description:
      "A buffer overflow vulnerability in network appliance firmware could allow attackers to gain administrative access.",
    severity: "high",
    cvssScore: 7.5,
    vendor: "NetworkTech",
    product: "SecureGateway 3000",
    publishedDate: "2024-01-13",
    lastModified: "2024-01-14",
    patchStatus: "available",
    references: [
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0003",
    ],
  },
  {
    id: "4",
    cve: "CVE-2024-0004",
    title: "Cross-Site Scripting in Web Framework",
    description:
      "Persistent XSS vulnerability in popular web framework could allow attackers to steal user credentials.",
    severity: "medium",
    cvssScore: 6.1,
    vendor: "WebFramework Corp",
    product: "QuickWeb 2.0",
    publishedDate: "2024-01-12",
    lastModified: "2024-01-13",
    patchStatus: "available",
    references: [
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0004",
    ],
  },
  {
    id: "5",
    cve: "CVE-2024-0005",
    title: "Privilege Escalation in Mobile OS",
    description:
      "Local privilege escalation vulnerability in mobile operating system allows apps to gain system-level access.",
    severity: "high",
    cvssScore: 7.8,
    vendor: "MobileTech",
    product: "MobileOS 15.2",
    publishedDate: "2024-01-11",
    lastModified: "2024-01-12",
    patchStatus: "none",
    references: [
      "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0005",
    ],
  },
];

export const Vulnerabilities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedPatchStatus, setSelectedPatchStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState("publishedDate");

  const severities = ["all", "critical", "high", "medium", "low"];
  const patchStatuses = ["all", "available", "pending", "none"];

  const filteredVulnerabilities = mockVulnerabilities.filter((vuln) => {
    const matchesSearch =
      vuln.cve.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      selectedSeverity === "all" || vuln.severity === selectedSeverity;
    const matchesPatchStatus =
      selectedPatchStatus === "all" || vuln.patchStatus === selectedPatchStatus;

    return matchesSearch && matchesSeverity && matchesPatchStatus;
  });

  const getPatchStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-400 bg-green-500/20 border-green-500/50";
      case "pending":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50";
      case "none":
        return "text-red-400 bg-red-500/20 border-red-500/50";
      default:
        return "text-cyber-muted bg-cyber-surface border-cyber-blue/20";
    }
  };

  const getPatchStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Patch Available";
      case "pending":
        return "Patch Pending";
      case "none":
        return "No Patch";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
              <span className="text-gradient">CVE</span> Database
            </h1>
            <p className="text-cyber-muted text-lg max-w-2xl">
              Comprehensive database of Common Vulnerabilities and Exposures
              (CVE) with detailed analysis, CVSS scores, and patch information.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="cyber-glass p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search */}
            <div className="lg:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-muted" />
                <input
                  type="text"
                  placeholder="Search CVE ID, vendor, product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 cyber-input"
                />
              </div>
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

            {/* Patch Status Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedPatchStatus}
                onChange={(e) => setSelectedPatchStatus(e.target.value)}
                className="w-full py-3 px-4 cyber-input"
              >
                <option value="all">All Status</option>
                {patchStatuses.slice(1).map((status) => (
                  <option key={status} value={status}>
                    {getPatchStatusLabel(status)}
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
                <option value="publishedDate">Latest</option>
                <option value="cvssScore">CVSS Score</option>
                <option value="severity">Severity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-cyber-muted">
            Showing{" "}
            <span className="text-cyber-blue font-medium">
              {filteredVulnerabilities.length}
            </span>{" "}
            vulnerabilities
          </p>
        </div>

        {/* Vulnerabilities Table */}
        <div className="cyber-glass overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cyber-surface/50 border-b border-cyber-blue/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-cyber-muted uppercase tracking-wider">
                    CVE ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-cyber-muted uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-cyber-muted uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-cyber-muted uppercase tracking-wider">
                    CVSS
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-cyber-muted uppercase tracking-wider">
                    Vendor/Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-cyber-muted uppercase tracking-wider">
                    Patch Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-cyber-muted uppercase tracking-wider">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-blue/10">
                {filteredVulnerabilities.map((vuln, index) => (
                  <motion.tr
                    key={vuln.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-cyber-surface/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <code className="text-cyber-blue font-mono text-sm bg-cyber-blue/10 px-2 py-1 rounded">
                          {vuln.cve}
                        </code>
                        <a
                          href={vuln.references[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyber-muted hover:text-cyber-blue transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-cyber-text font-medium text-sm leading-tight line-clamp-2">
                          {vuln.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ThreatLevel level={vuln.severity} size="sm" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-bold ${
                            vuln.cvssScore >= 9
                              ? "text-red-400"
                              : vuln.cvssScore >= 7
                              ? "text-orange-400"
                              : vuln.cvssScore >= 4
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {vuln.cvssScore}
                        </span>
                        <span className="text-cyber-muted text-xs">/10</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-cyber-text font-medium">
                          {vuln.vendor}
                        </p>
                        <p className="text-cyber-muted">{vuln.product}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getPatchStatusColor(
                          vuln.patchStatus
                        )}`}
                      >
                        {getPatchStatusLabel(vuln.patchStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 text-cyber-muted text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(vuln.publishedDate)}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredVulnerabilities.length === 0 && (
          <div className="text-center py-12">
            <div className="cyber-glass p-8 max-w-md mx-auto">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-cyber-muted opacity-50" />
              <h3 className="text-lg font-medium text-cyber-text mb-2">
                No vulnerabilities found
              </h3>
              <p className="text-cyber-muted text-sm mb-4">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSeverity("all");
                  setSelectedPatchStatus("all");
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
