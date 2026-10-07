import type { ReactNode } from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeDataType, ResumeEntryType, ResumeOptionsType } from "../../types";
import { PdfEntry } from "./PdfEntry";

const styles = StyleSheet.create({
  page: { paddingVertical: 36, paddingHorizontal: 44, fontFamily: "Helvetica", fontSize: 10, color: "#1f2937" },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#111827" },
  headline: { fontSize: 11, marginTop: 3 },
  contact: { fontSize: 9, color: "#4b5563", marginTop: 6 },
  section: { marginTop: 14 },
  heading: { fontSize: 10, fontFamily: "Helvetica-Bold", letterSpacing: 1.2, paddingBottom: 3, marginBottom: 6, borderBottomWidth: 1 },
  body: { fontSize: 9.5, lineHeight: 1.45, color: "#374151" },
});

type TemplateProps = { data: ResumeDataType; options: ResumeOptionsType };

export const ClassicTemplate = ({ data, options }: TemplateProps) => {
  const { accent, sections } = options;

  const Section = ({ title, show, children }: { title: string; show: boolean; children: ReactNode }) =>
    show ? (
      <View style={styles.section}>
        <Text style={[styles.heading, { color: accent, borderBottomColor: accent }]}>{title.toUpperCase()}</Text>
        {children}
      </View>
    ) : null;

  const Entries = ({ items }: { items: ResumeEntryType[] }) =>
    items.map((entry, index) => <PdfEntry key={`${entry.title}-${index}`} entry={entry} accent={accent} />);

  return (
    <Document title={`${data.name} - Resume`} author={data.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.name}</Text>
        {data.headline ? <Text style={[styles.headline, { color: accent }]}>{data.headline}</Text> : null}
        <Text style={styles.contact}>{data.contact.join("  |  ")}</Text>

        <Section title="Summary" show={sections.summary && Boolean(data.summary)}>
          <Text style={styles.body}>{data.summary}</Text>
        </Section>
        <Section title="Skills" show={sections.skills && data.skills.length > 0}>
          <Text style={styles.body}>{data.skills.map((skill) => skill.name).join("  ·  ")}</Text>
        </Section>
        <Section title="Experience" show={sections.experience && data.experience.length > 0}>
          <Entries items={data.experience} />
        </Section>
        <Section title="Projects" show={sections.projects && data.projects.length > 0}>
          <Entries items={data.projects} />
        </Section>
        <Section title="Education" show={sections.education && data.education.length > 0}>
          <Entries items={data.education} />
        </Section>
        <Section title="Certifications" show={sections.certifications && data.certifications.length > 0}>
          <Entries items={data.certifications} />
        </Section>
        <Section title="Languages" show={sections.languages && data.languages.length > 0}>
          <Text style={styles.body}>{data.languages.join("  ·  ")}</Text>
        </Section>
      </Page>
    </Document>
  );
};
