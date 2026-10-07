import type { ReactNode } from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeDataType, ResumeEntryType, ResumeOptionsType } from "../../types";
import { PdfEntry } from "./PdfEntry";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 10, color: "#1f2937" },
  sidebar: { width: "32%", paddingVertical: 36, paddingHorizontal: 20, color: "#ffffff" },
  main: { width: "68%", paddingVertical: 36, paddingHorizontal: 26 },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", lineHeight: 1.15 },
  headline: { fontSize: 10, marginTop: 6, opacity: 0.9 },
  sideHeading: { fontSize: 9, fontFamily: "Helvetica-Bold", letterSpacing: 1.2, marginTop: 18, marginBottom: 6, opacity: 0.85 },
  sideText: { fontSize: 9, marginBottom: 4, lineHeight: 1.35 },
  section: { marginBottom: 14 },
  heading: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 6 },
  body: { fontSize: 9.5, lineHeight: 1.45, color: "#374151" },
});

type TemplateProps = { data: ResumeDataType; options: ResumeOptionsType };

export const ModernTemplate = ({ data, options }: TemplateProps) => {
  const { accent, sections } = options;

  const SideList = ({ title, items, show }: { title: string; items: string[]; show: boolean }) =>
    show && items.length > 0 ? (
      <View>
        <Text style={styles.sideHeading}>{title.toUpperCase()}</Text>
        {items.map((item, index) => (
          <Text key={`${item}-${index}`} style={styles.sideText}>{item}</Text>
        ))}
      </View>
    ) : null;

  const Section = ({ title, items, show, children }: { title: string; items?: ResumeEntryType[]; show: boolean; children?: ReactNode }) =>
    show ? (
      <View style={styles.section}>
        <Text style={[styles.heading, { color: accent }]}>{title}</Text>
        {children}
        {items?.map((entry, index) => <PdfEntry key={`${entry.title}-${index}`} entry={entry} accent={accent} />)}
      </View>
    ) : null;

  return (
    <Document title={`${data.name} - Resume`} author={data.name}>
      <Page size="A4" style={styles.page}>
        <View style={[styles.sidebar, { backgroundColor: accent }]} fixed>
          <Text style={styles.name}>{data.name}</Text>
          {data.headline ? <Text style={styles.headline}>{data.headline}</Text> : null}
          <SideList title="Contact" items={data.contact} show />
          <SideList
            title="Skills"
            items={data.skills.map((skill) => (skill.level ? `${skill.name} — ${skill.level}` : skill.name))}
            show={sections.skills}
          />
          <SideList title="Languages" items={data.languages} show={sections.languages} />
        </View>
        <View style={styles.main}>
          <Section title="Profile" show={sections.summary && Boolean(data.summary)}>
            <Text style={styles.body}>{data.summary}</Text>
          </Section>
          <Section title="Experience" items={data.experience} show={sections.experience && data.experience.length > 0} />
          <Section title="Projects" items={data.projects} show={sections.projects && data.projects.length > 0} />
          <Section title="Education" items={data.education} show={sections.education && data.education.length > 0} />
          <Section
            title="Certifications"
            items={data.certifications}
            show={sections.certifications && data.certifications.length > 0}
          />
        </View>
      </Page>
    </Document>
  );
};
