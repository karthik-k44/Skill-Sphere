import { Award, ExternalLink } from "lucide-react";
import { EmptyState, PanelBox } from "../../../../components";
import type { UserCertifications } from "../../../../types";

interface CertificatesDataProps {
  certifications: UserCertifications[];
}
const CertificatesData:React.FC<CertificatesDataProps> = ({ certifications }) => {
  return (
    <PanelBox
      eyebrow="Certifications"
      title="Credentials"
      icon={<Award className="h-5 w-5" />}
    >
      <div className="space-y-3">
        {certifications.length > 0 ? (
          certifications.map((certification, index) => (
            <a
              key={`${certification?.name}-${index}`}
              href={certification?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/60"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {certification?.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Verified credential
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-primary-500" />
            </a>
          ))
        ) : (
          <EmptyState message="Add certifications to strengthen trust and credibility." />
        )}
      </div>
    </PanelBox>
  );
}

export default CertificatesData;
