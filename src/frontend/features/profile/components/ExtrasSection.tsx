import { Award, Languages } from "lucide-react";
import { EmptyCertification, EmptyLanguage } from "../lib/profile-form";
import { useArrayField } from "../lib/use-array-field";
import { CertificationItem } from "./CertificationItem";
import { LanguageRow } from "./LanguageRow";
import { RepeatableSection } from "./RepeatableSection";
import { TagField } from "./TagField";

export const ExtrasSection = () => {
  const certifications = useArrayField("certifications");
  const languages = useArrayField("languages");

  return (
    <div className="space-y-10">
      <RepeatableSection
        title="Certifications"
        description="Courses and credentials that back up your skills."
        icon={Award}
        count={certifications.items.length}
        addLabel="Add certification"
        emptyTitle="No certifications yet"
        onAdd={() => certifications.add(EmptyCertification())}
      >
        {certifications.items.map((_, index) => (
          <CertificationItem key={index} index={index} onRemove={() => certifications.remove(index)} />
        ))}
      </RepeatableSection>

      <RepeatableSection
        title="Languages"
        description="Spoken languages and how well you use them at work."
        icon={Languages}
        count={languages.items.length}
        addLabel="Add language"
        emptyTitle="No languages yet"
        onAdd={() => languages.add(EmptyLanguage())}
      >
        {languages.items.map((_, index) => (
          <LanguageRow key={index} index={index} onRemove={() => languages.remove(index)} />
        ))}
      </RepeatableSection>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Interests</h2>
        <TagField name="interests" label="What you enjoy outside work" placeholder="Open source, chess…" />
      </section>
    </div>
  );
};
