import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeEntryType } from "../../types";

const styles = StyleSheet.create({
  entry: { marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  title: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: "#111827" },
  period: { fontSize: 9, color: "#6b7280" },
  subtitle: { fontSize: 9.5, marginTop: 1 },
  description: { fontSize: 9.5, color: "#374151", marginTop: 3, lineHeight: 1.4 },
  tags: { fontSize: 8.5, color: "#6b7280", marginTop: 3 },
});

/** One experience/project/education block, shared by every template. */
export const PdfEntry = ({ entry, accent }: { entry: ResumeEntryType; accent: string }) => (
  <View style={styles.entry} wrap={false}>
    <View style={styles.row}>
      <Text style={styles.title}>{entry.title}</Text>
      {entry.period ? <Text style={styles.period}>{entry.period}</Text> : null}
    </View>
    {entry.subtitle ? <Text style={[styles.subtitle, { color: accent }]}>{entry.subtitle}</Text> : null}
    {entry.description ? <Text style={styles.description}>{entry.description}</Text> : null}
    {entry.tags.length > 0 ? <Text style={styles.tags}>{entry.tags.join(" · ")}</Text> : null}
  </View>
);
