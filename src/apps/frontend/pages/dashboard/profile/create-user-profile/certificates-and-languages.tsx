import { Plus, Trash2 } from "lucide-react";
import { Button, FormControl, Input, Text } from "../../../../components";
import type {
  UserCertifications,
  UserInterests,
  UserLanguages,
} from "../../../../types";
import {
  profileDeleteIconButtonClass,
  profileItemCardClass,
  profileItemHeaderClass,
  profileSectionClass,
  profileSectionHeaderClass,
  profileStepContainerClass,
} from "./create-user-profile-ui";

interface CertificatesAndLanguagesProps {
  handleAddNewCertification: () => void;
  handleUpdateCertification: (
    index: number,
    field: keyof UserCertifications,
    value: string,
  ) => void;
  handleDeleteCertification: (index: number) => void;
  handleAddNewLanguage: () => void;
  handleUpdateLanguage: (
    index: number,
    field: keyof UserLanguages,
    value: string,
  ) => void;
  handleDeleteLanguage: (index: number) => void;
  handleAddNewInterest: () => void;
  handleUpdateInterest: (
    index: number,
    field: keyof UserInterests,
    value: string,
  ) => void;
  handleDeleteInterest: (index: number) => void;
  certifications: UserCertifications[];
  languages: UserLanguages[];
  interests: UserInterests[];
}

const CertificatesAndLanguages: React.FC<CertificatesAndLanguagesProps> = ({
  handleAddNewCertification,
  handleUpdateCertification,
  handleDeleteCertification,
  handleAddNewLanguage,
  handleUpdateLanguage,
  handleDeleteLanguage,
  handleAddNewInterest,
  handleUpdateInterest,
  handleDeleteInterest,
  certifications,
  languages,
  interests,
}) => {
  return (
    <div className={profileStepContainerClass}>
      <section className={profileSectionClass}>
        <div className={profileSectionHeaderClass}>
          <Text font="ParagraphLarge">Certifications</Text>
          <div className="w-fit">
            <Button onClick={handleAddNewCertification}>
              <Plus size={16} className="mr-1" /> Add Certification
            </Button>
          </div>
        </div>
        {certifications.map((certification, index) => (
          <div key={`certification-${index}`} className={profileItemCardClass}>
            <div className={profileItemHeaderClass}>
              <Text font="LabelLarge">Certification {index + 1}</Text>
              <button
                type="button"
                onClick={() => handleDeleteCertification(index)}
                className={profileDeleteIconButtonClass}
                aria-label={`Delete certification ${index + 1}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormControl label="Certification Name" error="">
                <Input
                  placeholder="AWS Certified Cloud Practitioner"
                  value={certification.name}
                  onChange={(e) =>
                    handleUpdateCertification(index, "name", e.target.value)
                  }
                />
              </FormControl>
              <FormControl label="Link" error="">
                <Input
                  placeholder="https://aws.amazon.com/verification"
                  value={certification.link}
                  onChange={(e) =>
                    handleUpdateCertification(index, "link", e.target.value)
                  }
                />
              </FormControl>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className={profileSectionClass}>
          <div className={profileSectionHeaderClass}>
            <Text font="ParagraphLarge">Languages</Text>
            <div className="w-fit">
              <Button onClick={handleAddNewLanguage}>
                <Plus size={16} className="mr-1" /> Add Language
              </Button>
            </div>
          </div>
          {languages.map((language, index) => (
            <div key={`language-${index}`} className={profileItemCardClass}>
              <div className={profileItemHeaderClass}>
                <Text font="LabelLarge">Language {index + 1}</Text>
                <button
                  type="button"
                  className={profileDeleteIconButtonClass}
                  onClick={() => handleDeleteLanguage(index)}
                  aria-label={`Delete language ${index + 1}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormControl label="Language" error="">
                  <Input
                    placeholder="English"
                    value={language.name}
                    onChange={(e) =>
                      handleUpdateLanguage(index, "name", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl label="Proficiency" error="">
                  <Input
                    placeholder="Native"
                    value={language.proficiency}
                    onChange={(e) =>
                      handleUpdateLanguage(index, "proficiency", e.target.value)
                    }
                  />
                </FormControl>
              </div>
            </div>
          ))}
        </section>

        <section className={profileSectionClass}>
          <div className={profileSectionHeaderClass}>
            <Text font="ParagraphLarge">Interests</Text>
            <div className="w-fit">
              <Button onClick={handleAddNewInterest}>
                <Plus size={16} className="mr-1" /> Add Interest
              </Button>
            </div>
          </div>
          {interests.map((interest, index) => (
            <div key={`interest-${index}`} className={profileItemCardClass}>
              <div className={profileItemHeaderClass}>
                <Text font="LabelLarge">Interest {index + 1}</Text>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteInterest(index);
                  }}
                  className={profileDeleteIconButtonClass}
                  aria-label={`Delete interest ${index + 1}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <FormControl label="Interest" error="">
                <Input
                  placeholder="Machine Learning"
                  value={interest.name}
                  onChange={(e) =>
                    handleUpdateInterest(index, "name", e.target.value)
                  }
                />
              </FormControl>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CertificatesAndLanguages;
