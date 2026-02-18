import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { orientations } from '../../data/orientations';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
  },
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A2B44',
    marginBottom: 4,
  },
  logoDivider: {
    width: 80,
    height: 1,
    backgroundColor: '#A88661',
    marginBottom: 8,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#A88661',
    fontStyle: 'italic',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A2B44',
    marginBottom: 12,
    textAlign: 'center',
  },
  preparedFor: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  date: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#A88661',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A2B44',
    marginBottom: 12,
    marginTop: 20,
  },
  bodyText: {
    fontSize: 11,
    color: '#1A2B44',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    width: 16,
    fontSize: 11,
    color: '#90B4A8',
  },
  listText: {
    flex: 1,
    fontSize: 11,
    color: '#1A2B44',
    lineHeight: 1.5,
  },
  noteBox: {
    backgroundColor: '#F9F4EF',
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1A2B44',
  },
  orientationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  accentBar: {
    width: 4,
    height: 24,
    marginRight: 12,
  },
});

export function ReportDocument({ results, userName = 'You' }) {
  const primary = orientations[results.primary.orientation];

  return (
    <Document>
      {/* Page 1: Cover */}
      <Page size="A4" style={[styles.page, styles.coverPage]}>
        <Text style={styles.logo}>TACK</Text>
        <View style={styles.logoDivider} />
        <Text style={styles.subtitle}>by Tondreau Point</Text>
        <Text style={styles.title}>Your Financial Orientation Report</Text>
        <Text style={styles.preparedFor}>Prepared for {userName}</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.footer}>TACK by Tondreau Point</Text>
      </Page>

      {/* Page 2: Your Orientation */}
      <Page size="A4" style={styles.page}>
        <View style={styles.orientationHeader}>
          <View
            style={[styles.accentBar, { backgroundColor: primary.color }]}
          />
          <View>
            <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
              {primary.name}
            </Text>
            <Text style={styles.bodyText}>{primary.tagline}</Text>
          </View>
        </View>
        <Text style={styles.bodyText}>{primary.summary}</Text>
        <Text style={styles.sectionTitle}>What This Means</Text>
        <Text style={styles.bodyText}>{primary.whatThisMeans}</Text>
        <Text style={styles.footer}>TACK by Tondreau Point</Text>
      </Page>

      {/* Page 3: Strengths and Growth */}
      <Page size="A4" style={styles.page}>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          Your Strengths
        </Text>
        {primary.strengths.map((s, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{s}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Where You Can Grow</Text>
        {primary.growthAreas.map((g, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{g}</Text>
          </View>
        ))}
        <Text style={styles.footer}>TACK by Tondreau Point</Text>
      </Page>

      {/* Page 4: A Note From Penny */}
      <Page size="A4" style={styles.page}>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          A Note From Penny
        </Text>
        <View style={[styles.noteBox, { borderLeftColor: primary.color }]}>
          <Text style={styles.bodyText}>{primary.pennyMessage}</Text>
        </View>
        <Text style={styles.footer}>TACK by Tondreau Point</Text>
      </Page>

      {/* Page 5: Your Next Steps */}
      <Page size="A4" style={styles.page}>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          Your Next Steps
        </Text>
        {primary.nextSteps.map((step, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>{i + 1}.</Text>
            <Text style={styles.listText}>{step}</Text>
          </View>
        ))}
        <Text style={[styles.bodyText, { marginTop: 24 }]}>
          Space for notes and reflection:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            minHeight: 80,
            marginTop: 8,
          }}
        />
        <Text style={styles.footer}>TACK by Tondreau Point</Text>
      </Page>

      {/* Page 6: About TACK */}
      <Page size="A4" style={styles.page}>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          About TACK
        </Text>
        <Text style={styles.bodyText}>
          This assessment is just the beginning. TACK by Tondreau Point is
          building a financial wellness platform for people like you — a
          community, a guide, and a path forward.
        </Text>
        <Text style={[styles.bodyText, { marginTop: 16 }]}>
          Visit us to learn more about what's coming.
        </Text>
        <Text style={[styles.footer, { marginTop: 40 }]}>
          TACK by Tondreau Point
        </Text>
      </Page>
    </Document>
  );
}
