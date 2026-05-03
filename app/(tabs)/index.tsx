import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// ─── CONSTANTS ───────────────────────────────────────────────
const LIME = '#ccff00';
const EMERALD = '#5EF1A0';
const BG = '#000';
const SURFACE = '#111';
const SURFACE2 = '#1a1a1a';
const MUTED = '#888';
const FAINT = '#555';

// ─── SERVICE TILES (Image 1 grid — adapted for UAE/Obolus) ───
const SERVICES = [
  { icon: 'call-outline',       label: 'Airtime'   },
  { icon: 'wifi-outline',       label: 'Internet'  },
  { icon: 'car-outline',        label: 'Transport' },
  { icon: 'flash-outline',      label: 'Advance'   }, // replaces Bet
  { icon: 'bulb-outline',       label: 'DEWA'      }, // replaces Electricity
  { icon: 'gift-outline',       label: 'Gift'      },
  { icon: 'ellipsis-horizontal',label: 'More'      },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── TOP NAV BAR ── */}
        {/* Airbills: logo left, icon pills + wallet chip right */}
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            {/* Replace with your actual logo asset */}
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>O</Text>
            </View>
            <Text style={styles.wordmark}>obolus</Text>
          </View>
          <View style={styles.topBarRight}>
            {/* Icon pill 1 — grid/apps */}
            <TouchableOpacity style={styles.iconPill}>
              <Ionicons name="apps-outline" size={16} color="#fff" />
            </TouchableOpacity>
            {/* Icon pill 2 — QR/scan */}
            <TouchableOpacity style={styles.iconPill}>
              <Ionicons name="scan-outline" size={16} color="#fff" />
            </TouchableOpacity>
            {/* Wallet address chip — exact Airbills style: dark pill, phone icon, truncated address */}
            <View style={styles.walletChip}>
              <Ionicons name="phone-portrait-outline" size={11} color={LIME} />
              <Text style={styles.walletChipText}>0x..yy4</Text>
            </View>
          </View>
        </View>

        {/* ── BALANCE CARD ── */}
        {/* Airbills: #111 rounded card, inner layout = avatar+name | crypto balance / Balance label | big $ / fiat equiv / actions row */}
        <View style={styles.balanceCard}>
          {/* Card top row */}
          <View style={styles.cardTopRow}>
            {/* Left: avatar circle + username */}
            <View style={styles.avatarRow}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={12} color={LIME} />
              </View>
              <Text style={styles.setUsername}>Set Username</Text>
            </View>
            {/* Right: PUSD crypto balance — small */}
            <View style={styles.cryptoBalanceChip}>
              <Text style={styles.cryptoSymbol}>P</Text>
              <Text style={styles.cryptoAmt}>438.91</Text>
            </View>
          </View>

          {/* Balance label + eye */}
          <View style={styles.balanceLabelRow}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={14} color={MUTED} />
            </TouchableOpacity>
          </View>

          {/* Big balance amount */}
          <Text style={styles.balanceAmount}>$4,067.00</Text>

          {/* Fiat equiv */}
          <Text style={styles.fiatEquiv}>≈ 4,067 PUSD</Text>

          {/* Actions row: Send | Receive | PUSD dropdown */}
          {/* Airbills: two dark circle buttons on left, token pill on right */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/send')}
            >
              {/* Airbills: dark circle, arrow icon, label below */}
              <View style={styles.actionCircle}>
                <Ionicons name="arrow-up-outline" size={18} color="#fff" />
              </View>
              <Text style={styles.actionLabel}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <View style={styles.actionCircle}>
                <Ionicons name="arrow-down-outline" size={18} color="#fff" />
              </View>
              <Text style={styles.actionLabel}>Receive</Text>
            </TouchableOpacity>

            {/* Token selector pill — right side of card */}
            {/* Airbills: pill with logo + name + small balance + chevron */}
            <TouchableOpacity style={styles.tokenPill}>
              <View style={styles.tokenDot} />
              <View>
                <Text style={styles.tokenName}>PUSD</Text>
                <Text style={styles.tokenBal}>0.00</Text>
              </View>
              <Ionicons name="chevron-down" size={12} color={MUTED} />
            </TouchableOpacity>
          </View>

          {/* Decorative vertical bar lines — right side, exactly like Airbills */}
          <View style={styles.decorBars} pointerEvents="none">
            {[...Array(6)].map((_, i) => (
              <View key={i} style={[styles.decorBar, { opacity: 0.04 + i * 0.03 }]} />
            ))}
          </View>
        </View>

        {/* ── SERVICES SECTION ── */}
        {/* Airbills: "Services" label + country flag pill, then grid */}
        <View style={styles.servicesSection}>
          {/* Section header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            {/* Country selector pill — Airbills uses 🇳🇬 NG, we use 🇦🇪 UAE */}
            <TouchableOpacity style={styles.countryPill}>
              <Text style={styles.countryFlag}>🇦🇪</Text>
              <Text style={styles.countryLabel}>UAE</Text>
              <Ionicons name="chevron-down" size={10} color={MUTED} />
            </TouchableOpacity>
          </View>

          {/* Services grid */}
          {/* Airbills: 4-per-row, first row full, second row has 3 items */}
          <View style={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <TouchableOpacity key={i} style={styles.serviceTile} activeOpacity={0.7}>
                {/* Icon — Airbills uses orange, we use lime */}
                <Ionicons name={s.icon as any} size={22} color={LIME} />
                <Text style={styles.serviceLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── PORTFOLIO PERFORMANCE CARD ── */}
        {/* New section below services, not in Airbills but Obolus-specific */}
        <View style={styles.perfCard}>
          <View style={styles.perfHeader}>
            <Text style={styles.perfTitle}>Portfolio</Text>
            <Text style={styles.perfChange}>+2.4%</Text>
          </View>
          {/* Placeholder chart bar — replace with your actual chart component */}
          <View style={styles.chartPlaceholder}>
            {[40,65,50,80,60,90,75].map((h, i) => (
              <View
                key={i}
                style={[styles.chartBar, {
                  height: h * 0.5,
                  backgroundColor: i === 6 ? LIME : SURFACE2,
                }]}
              />
            ))}
          </View>
          <View style={styles.perfFooter}>
            <Text style={styles.perfFooterText}>7D Performance</Text>
            <Text style={[styles.perfFooterText, { color: LIME }]}>View All →</Text>
          </View>
        </View>

      </ScrollView>

      {/* ── FAB CHAT BUTTON ── */}
      {/* Airbills has orange circle FAB bottom-right. Obolus = lime, routes to /chat */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/chat')}
        activeOpacity={0.85}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: BG },
  scroll:        { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 120 },

  // TOP BAR
  topBar:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  logoRow:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoBox:       { width: 28, height: 28, borderRadius: 6, backgroundColor: LIME, alignItems: 'center', justifyContent: 'center' },
  logoText:      { fontFamily: 'Syne_700Bold', fontSize: 14, color: '#000' },
  wordmark:      { fontFamily: 'Syne_700Bold', fontSize: 16, color: '#fff' },
  topBarRight:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconPill:      { width: 32, height: 32, borderRadius: 8, backgroundColor: SURFACE, alignItems: 'center', justifyContent: 'center' },
  walletChip:    { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: SURFACE, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2a' },
  walletChipText:{ fontFamily: 'Inter_400Regular', fontSize: 11, color: '#ccc' },

  // BALANCE CARD — #111 rounded, ~16px padding, relative positioned
  balanceCard:   { backgroundColor: SURFACE, borderRadius: 20, padding: 16, marginTop: 4, overflow: 'hidden' },
  cardTopRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  avatarRow:     { flexDirection: 'row', alignItems: 'center', gap: 6 },
  avatarCircle:  { width: 22, height: 22, borderRadius: 11, backgroundColor: '#222', alignItems: 'center', justifyContent: 'center' },
  setUsername:   { fontFamily: 'Manrope_500Medium', fontSize: 12, color: '#aaa' },
  cryptoBalanceChip: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#1a1a1a', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  cryptoSymbol:  { fontFamily: 'Manrope_700Bold', fontSize: 11, color: LIME },
  cryptoAmt:     { fontFamily: 'Manrope_600SemiBold', fontSize: 11, color: '#fff' },
  balanceLabelRow:{ flexDirection: 'row', alignItems: 'center', gap: 6 },
  balanceLabel:  { fontFamily: 'Inter_400Regular', fontSize: 12, color: MUTED },
  balanceAmount: { fontFamily: 'Syne_700Bold', fontSize: 36, color: '#fff', marginTop: 2 },
  fiatEquiv:     { fontFamily: 'Inter_400Regular', fontSize: 12, color: MUTED, marginTop: 2 },

  // ACTIONS ROW
  actionsRow:    { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 10 },
  actionBtn:     { alignItems: 'center', gap: 4 },
  actionCircle:  { width: 42, height: 42, borderRadius: 21, backgroundColor: '#222', alignItems: 'center', justifyContent: 'center' },
  actionLabel:   { fontFamily: 'Manrope_500Medium', fontSize: 11, color: '#ccc' },
  tokenPill:     { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1a1a1a', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12 },
  tokenDot:      { width: 20, height: 20, borderRadius: 10, backgroundColor: LIME },
  tokenName:     { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: '#fff' },
  tokenBal:      { fontFamily: 'Inter_400Regular', fontSize: 10, color: MUTED },

  // DECORATIVE BARS (right side of balance card)
  decorBars:     { position: 'absolute', right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'stretch', gap: 4, paddingVertical: 8, paddingRight: 8 },
  decorBar:      { width: 3, borderRadius: 2, backgroundColor: '#fff' },

  // SERVICES
  servicesSection: { marginTop: 20 },
  sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle:    { fontFamily: 'Manrope_600SemiBold', fontSize: 15, color: '#fff' },
  countryPill:     { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: SURFACE, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 10 },
  countryFlag:     { fontSize: 13 },
  countryLabel:    { fontFamily: 'Manrope_500Medium', fontSize: 11, color: '#ccc' },
  servicesGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  serviceTile:     { width: '22%', aspectRatio: 1, backgroundColor: SURFACE2, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 6 },
  serviceLabel:    { fontFamily: 'Inter_400Regular', fontSize: 10, color: '#fff', textAlign: 'center' },

  // PORTFOLIO PERF CARD
  perfCard:        { backgroundColor: SURFACE, borderRadius: 16, padding: 14, marginTop: 20 },
  perfHeader:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  perfTitle:       { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: '#fff' },
  perfChange:      { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: EMERALD },
  chartPlaceholder:{ flexDirection: 'row', alignItems: 'flex-end', gap: 5, height: 50 },
  chartBar:        { flex: 1, borderRadius: 3 },
  perfFooter:      { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  perfFooterText:  { fontFamily: 'Inter_400Regular', fontSize: 11, color: MUTED },

  // FAB
  fab: { position: 'absolute', bottom: 96, right: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: LIME, alignItems: 'center', justifyContent: 'center', shadowColor: LIME, shadowOffset: {width:0,height:4}, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },
});
