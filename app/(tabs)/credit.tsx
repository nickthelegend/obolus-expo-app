import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LIME = '#ccff00';
const EMERALD = '#5EF1A0';
const BG = '#000';
const SURFACE = '#111';
const SURFACE2 = '#1a1a1a';
const MUTED = '#888';
const BORDER = '#2a2a2a';

export default function CreditScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={cs.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={cs.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <Text style={cs.pageTitle}>Credit</Text>
        <Text style={cs.pageSub}>Instant PUSD Advances · Powered by PER</Text>

        {/* ADVANCE CARD — primary card with lime left border */}
        <View style={cs.advanceCard}>
          <View style={cs.advanceLimeBorder} />
          <View style={cs.advanceContent}>
            <Text style={cs.advanceLabel}>Available Advance</Text>
            <Text style={cs.advanceAmount}>PUSD 0.00</Text>
            <View style={cs.perBadge}>
              <Ionicons name="lock-closed" size={10} color={LIME} />
              <Text style={cs.perBadgeText}>Secured by PER Enclave</Text>
            </View>
            <TouchableOpacity style={cs.requestBtn} activeOpacity={0.85}>
              <Text style={cs.requestBtnText}>Request Advance</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HOW IT WORKS */}
        <Text style={cs.sectionTitle}>How it Works</Text>
        {[
          { n:'01', t:'Upload Proof', d:'Salary slip, stipend, scholarship, or parental support letter', icon:'document-text-outline' },
          { n:'02', t:'Instant Score',d:'Private credit scoring runs inside Intel TDX TEE — zero data exposure', icon:'shield-checkmark-outline' },
          { n:'03', t:'Receive PUSD', d:'30–50% of expected inflow lands in your wallet instantly', icon:'flash-outline' },
        ].map((step, i) => (
          <View key={i} style={cs.stepCard}>
            <View style={cs.stepNumBox}>
              <Text style={cs.stepNum}>{step.n}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={cs.stepTitle}>{step.t}</Text>
              <Text style={cs.stepDesc}>{step.d}</Text>
            </View>
            <Ionicons name={step.icon as any} size={20} color={LIME} />
          </View>
        ))}

        {/* REPAYMENT INFO */}
        <View style={cs.repayCard}>
          <Ionicons name="refresh-circle-outline" size={20} color={EMERALD} />
          <View style={{ flex: 1 }}>
            <Text style={cs.repayTitle}>Auto-Repayment</Text>
            <Text style={cs.repayDesc}>When your next inflow arrives via the Obolus rail, repayment is handled automatically inside PER.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const cs = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: BG },
  scroll:        { padding: 20, paddingBottom: 100 },
  pageTitle:     { fontFamily: 'Syne_700Bold', fontSize: 28, color: '#fff' },
  pageSub:       { fontFamily: 'Inter_400Regular', fontSize: 13, color: MUTED, marginTop: 4, marginBottom: 20 },
  advanceCard:   { flexDirection: 'row', backgroundColor: SURFACE, borderRadius: 18, marginBottom: 24, overflow: 'hidden' },
  advanceLimeBorder:{ width: 4, backgroundColor: LIME },
  advanceContent:{ flex: 1, padding: 16 },
  advanceLabel:  { fontFamily: 'Inter_400Regular', fontSize: 12, color: MUTED },
  advanceAmount: { fontFamily: 'Syne_700Bold', fontSize: 26, color: '#fff', marginVertical: 4 },
  perBadge:      { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  perBadgeText:  { fontFamily: 'Inter_400Regular', fontSize: 10, color: LIME },
  requestBtn:    { backgroundColor: LIME, borderRadius: 10, paddingVertical: 12, alignItems: 'center', shadowColor: LIME, shadowOffset: {width:0, height:4}, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },
  requestBtnText:{ fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#000' },
  sectionTitle:  { fontFamily: 'Manrope_600SemiBold', fontSize: 15, color: '#fff', marginBottom: 10 },
  stepCard:      { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: SURFACE, borderRadius: 14, padding: 14, marginBottom: 10 },
  stepNumBox:    { width: 32, height: 32, borderRadius: 8, backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: LIME, alignItems: 'center', justifyContent: 'center' },
  stepNum:       { fontFamily: 'Manrope_700Bold', fontSize: 12, color: LIME },
  stepTitle:     { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: '#fff' },
  stepDesc:      { fontFamily: 'Inter_400Regular', fontSize: 11, color: MUTED, marginTop: 2 },
  repayCard:     { flexDirection: 'row', gap: 12, backgroundColor: '#0d1f16', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#1a3a27', marginTop: 6 },
  repayTitle:    { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: EMERALD },
  repayDesc:     { fontFamily: 'Inter_400Regular', fontSize: 11, color: MUTED, marginTop: 2 },
});
