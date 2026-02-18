import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { orientations } from '../../data/orientations';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Times-Roman',
    fontSize: 11,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#A88661',
  },
  pageHeaderLogo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A2B44',
  },
  pageHeaderSub: {
    fontSize: 9,
    color: '#A88661',
    fontStyle: 'italic',
  },
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    backgroundColor: '#F5F3ED',
  },
  logoImage: {
    width: 280,
    height: 'auto',
    marginBottom: 24,
  },
  logoImageHeader: {
    width: 120,
    height: 'auto',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A2B44',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 1.4,
  },
  preparedFor: {
    fontSize: 13,
    color: '#1A2B44',
    marginBottom: 6,
  },
  date: {
    fontSize: 11,
    color: '#A88661',
    marginBottom: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 48,
    right: 48,
    textAlign: 'center',
    fontSize: 10,
    color: '#A88661',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A2B44',
    marginBottom: 14,
    marginTop: 24,
  },
  bodyText: {
    fontSize: 11,
    color: '#1A2B44',
    lineHeight: 1.7,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 20,
    fontSize: 11,
    color: '#A88661',
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 11,
    color: '#1A2B44',
    lineHeight: 1.6,
  },
  noteBox: {
    backgroundColor: '#F5F3ED',
    padding: 20,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#A88661',
  },
  orientationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  accentBar: {
    width: 4,
    height: 28,
    marginRight: 14,
  },
});

export function ReportDocument({ results, userName = 'You', logoDataUri }) {
  const primary = orientations[results.primary.orientation];

  return (
    <Document>
      {/* Page 1: Cover */}
      <Page size="A4" style={[styles.page, styles.coverPage]}>
        {logoDataUri ? (
          <Image src={logoDataUri} style={styles.logoImage} />
        ) : (
          <>
            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#1A2B44', marginBottom: 6, letterSpacing: 2 }}>TACK</Text>
            <Text style={{ fontSize: 13, color: '#A88661', fontStyle: 'italic', marginBottom: 48 }}>by Tondreau Point</Text>
          </>
        )}
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
        <View style={styles.pageHeader}>
          {logoDataUri ? (
            <Image src={logoDataUri} style={styles.logoImageHeader} />
          ) : (
            <>
              <Text style={styles.pageHeaderLogo}>TACK</Text>
              <Text style={styles.pageHeaderSub}>by Tondreau Point</Text>
            </>
          )}
        </View>
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
        <View style={[styles.pageHeader, { marginBottom: 20 }]}>
          {logoDataUri ? (
            <Image src={logoDataUri} style={styles.logoImageHeader} />
          ) : (
            <>
              <Text style={styles.pageHeaderLogo}>TACK</Text>
              <Text style={styles.pageHeaderSub}>by Tondreau Point</Text>
            </>
          )}
        </View>
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          Your Strengths
        </Text>
        {primary.strengths.map((s, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>{s}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Where You Can Grow</Text>
        {primary.growthAreas.map((g, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>{i + 1}.</Text>
            <Text style={styles.listText}>{g}</Text>
          </View>
        ))}
        <Text style={styles.footer}>TACK by Tondreau Point</Text>
      </Page>

      {/* Page 4: A Note From Penny */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.pageHeader, { marginBottom: 20 }]}>
          {logoDataUri ? (
            <Image src={logoDataUri} style={styles.logoImageHeader} />
          ) : (
            <>
              <Text style={styles.pageHeaderLogo}>TACK</Text>
              <Text style={styles.pageHeaderSub}>by Tondreau Point</Text>
            </>
          )}
        </View>
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
        <View style={[styles.pageHeader, { marginBottom: 20 }]}>
          {logoDataUri ? (
            <Image src={logoDataUri} style={styles.logoImageHeader} />
          ) : (
            <>
              <Text style={styles.pageHeaderLogo}>TACK</Text>
              <Text style={styles.pageHeaderSub}>by Tondreau Point</Text>
            </>
          )}
        </View>
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
        <View style={[styles.pageHeader, { marginBottom: 20 }]}>
          {logoDataUri ? (
            <Image src={logoDataUri} style={styles.logoImageHeader} />
          ) : (
            <>
              <Text style={styles.pageHeaderLogo}>TACK</Text>
              <Text style={styles.pageHeaderSub}>by Tondreau Point</Text>
            </>
          )}
        </View>
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
