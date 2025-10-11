/**
 * Certificate Card Component
 * Displays earned certificate with download option
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCertificate, 
  faDownload, 
  faCheckCircle, 
  faCalendar,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import { Certificate } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import dashboardService from '@/services/dashboardService';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const { toast } = useToast();
  const { course, issued_date, certificate_number, is_verified } = certificate;

  const handleDownload = async () => {
    try {
      const blob = await dashboardService.downloadCertificate(certificate.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${certificate_number}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Success',
        description: 'Certificate downloaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download certificate',
        variant: 'destructive',
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Certificate',
        text: `I earned a certificate for ${course?.title}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Certificate link copied to clipboard',
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faCertificate} className="w-8 h-8 text-white" />
          </div>
          {is_verified && (
            <div className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">
              <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {course?.title || 'Course Certificate'}
        </h3>

        {/* Certificate Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
            <span>Issued: {new Date(issued_date).toLocaleDateString()}</span>
          </div>
          <p className="text-xs text-gray-500">
            Certificate #{certificate_number}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;

