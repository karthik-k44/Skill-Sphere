import { Award, Globe, Heart, Plus, Sparkles, Trash2 } from "lucide-react";
import {
  Button,
  FormControl,
  Input,
  ProfileCreatorCards,
} from "../../../../components";
import { ButtonType } from "../../../../types/button";
import type {
  UserCertifications,
  UserInterests,
  UserLanguages,
} from "../../../../types";
import { ProfileDeleteIconButton, ProfileItemCard, ProfileItemHeader } from "../../../../components/profile-builder-ui/extra-profile-cards";
import Select from "../../../../components/select";
import { UserLanguageProficiencyData } from "../../../../constants";

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
    <div className="flex flex-col gap-5">
      <ProfileCreatorCards
        badge={
          <>
            <Award size={14} />
            Trust Signals
          </>
        }
        title="Certifications"
        description="Add certifications with verification links so your profile feels stronger and easier to validate."
        stat={
          <>
            <Sparkles size={16} />
            {certifications.length} Added
          </>
        }
        action={
          <Button type={ButtonType.BUTTON} onClick={handleAddNewCertification}>
            <Plus size={16} className="mr-1" /> Add Certification
          </Button>
        }
      >
        {certifications.map((certification, index) => (
          <ProfileItemCard key={`certification-${index}`}>
            <ProfileItemHeader
              title={`Certification ${index + 1}`}
              actions={
                <ProfileDeleteIconButton
                  onClick={() => handleDeleteCertification(index)}
                  aria-label={`Delete certification ${index + 1}`}
                >
                  <Trash2 size={20} />
                </ProfileDeleteIconButton>
              }
            />
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
          </ProfileItemCard>
        ))}
      </ProfileCreatorCards>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProfileCreatorCards
          badge={
            <>
              <Globe size={14} />
              Communication
            </>
          }
          title="Languages"
          description="Add the languages you use and the level you feel comfortable with so the profile reads naturally."
          stat={
            <>
              <Sparkles size={16} />
              {languages.length} Added
            </>
          }
          action={
            <Button type={ButtonType.BUTTON} onClick={handleAddNewLanguage}>
              <Plus size={16} className="mr-1" /> Add Language
            </Button>
          }
        >
          {languages.map((language, index) => (
            <ProfileItemCard key={`language-${index}`}>
              <ProfileItemHeader
                title={`Language ${index + 1}`}
                actions={
                  <ProfileDeleteIconButton
                    onClick={() => handleDeleteLanguage(index)}
                    aria-label={`Delete language ${index + 1}`}
                  >
                    <Trash2 size={20} />
                  </ProfileDeleteIconButton>
                }
              />
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
                  <Select
                    value={language.proficiency}
                    options={UserLanguageProficiencyData}
                    handleChange={(e) => handleUpdateLanguage(index, "proficiency", e.target.value)}
                    isLoading={false}
                  />
                </FormControl>
              </div>
            </ProfileItemCard>
          ))}
        </ProfileCreatorCards>

        <ProfileCreatorCards
          badge={
            <>
              <Heart size={14} />
              Personal Edge
            </>
          }
          title="Interests"
          description="Use this section to make your profile feel more complete and a little more human."
          stat={
            <>
              <Sparkles size={16} />
              {interests.length} Added
            </>
          }
          action={
            <Button type={ButtonType.BUTTON} onClick={handleAddNewInterest}>
              <Plus size={16} className="mr-1" /> Add Interest
            </Button>
          }
        >
          {interests.map((interest, index) => (
            <ProfileItemCard key={`interest-${index}`}>
              <ProfileItemHeader
                title={`Interest ${index + 1}`}
                actions={
                  <ProfileDeleteIconButton
                    onClick={() => {
                      handleDeleteInterest(index);
                    }}
                    aria-label={`Delete interest ${index + 1}`}
                  >
                    <Trash2 size={20} />
                  </ProfileDeleteIconButton>
                }
              />
              <FormControl label="Interest" error="">
                <Input
                  placeholder="Machine Learning"
                  value={interest.name}
                  onChange={(e) =>
                    handleUpdateInterest(index, "name", e.target.value)
                  }
                />
              </FormControl>
            </ProfileItemCard>
          ))}
        </ProfileCreatorCards>
      </div>
    </div>
  );
};

export default CertificatesAndLanguages;
