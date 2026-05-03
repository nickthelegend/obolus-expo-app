import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Modal, FlatList, ScrollView, StatusBar, KeyboardAvoidingView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, SlideInUp } from 'react-native-reanimated';

const LIME = '#ccff00';
const EMERALD = '#5EF1A0';
const BG = '#000';
const SURFACE = '#111';
const SURFACE2 = '#1a1a1a';
const SURFACE3 = '#222';
const MUTED = '#888';
const BORDER = '#2a2a2a';

// UAE Banks list (replacing Nigerian banks from Image 3)
const UAE_BANKS = [
  { id: '1', name: 'Emirates NBD',     color: '#FFD700', initials: 'E' },
  { id: '2', name: 'ADCB',             color: '#0066CC', initials: 'A' },
  { id: '3', name: 'First Abu Dhabi',  color: '#003366', initials: 'F' },
  { id: '4', name: 'Mashreq Bank',     color: '#FF0000', initials: 'M' },
  { id: '5', name: 'Dubai Islamic',    color: '#006633', initials: 'D' },
  { id: '6', name: 'RAK Bank',         color: '#CC0000', initials: 'R' },
  { id: '7', name: 'ENBD',             color: '#FFD700', initials: 'E' },
  { id: '8', name: 'Abu Dhabi Islamic',color: '#006600', initials: 'A' },
];

type Step = 'form' | 'confirm' | 'success';

export default function SendScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('form');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState<typeof UAE_BANKS[0] | null>(null);
  const [amount, setAmount] = useState('');
  const [bankModalVisible, setBankModalVisible] = useState(false);
  const [bankSearch, setBankSearch] = useState('');

  const filteredBanks = UAE_BANKS.filter(b =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

  // ── STEP: FORM ──────────────────────────────────────────────
  if (step === 'form') return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={s.formScroll} showsVerticalScrollIndicator={false}>

          {/* HEADER — Image 2 layout */}
          <View style={s.formHeader}>
            <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.85}>
              <Ionicons name="arrow-back" size={18} color="#fff" />
            </TouchableOpacity>
            <View style={s.headerText}>
              <Text style={s.headerTitle}>Send To Any Bank Account</Text>
              <Text style={s.headerSub}>Send to local bank account</Text>
            </View>
          </View>

          {/* FIELD 1: Account Number — Image 2 exact */}
          <View style={s.inputRow}>
            <TextInput
              style={s.textInput}
              placeholder="Account Number"
              placeholderTextColor={MUTED}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
              placeholderStyle={{ fontFamily: 'Inter_400Regular' }}
            />
            {/* Paste pill — exact Airbills style: dark pill right side */}
            <TouchableOpacity style={s.pasteBtn} activeOpacity={0.85}>
              <Text style={s.pasteBtnText}>Paste</Text>
            </TouchableOpacity>
          </View>

          {/* FIELD 2: Choose Bank dropdown — Image 2 exact */}
          <TouchableOpacity
            style={s.dropdownField}
            onPress={() => setBankModalVisible(true)}
            activeOpacity={0.8}
          >
            {/* Bank icon circle left */}
            <View style={[s.bankIconCircle, { backgroundColor: selectedBank?.color || SURFACE3 }]}>
              {selectedBank
                ? <Text style={s.bankInitial}>{selectedBank.initials}</Text>
                : <Ionicons name="business-outline" size={14} color={MUTED} />
              }
            </View>
            <Text style={[s.dropdownText, { color: selectedBank ? '#fff' : MUTED }]}>
              {selectedBank ? selectedBank.name : 'Choose Bank'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={MUTED} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>

          {/* FIELD 3: Amount — Image 2 exact layout */}
          <View style={s.amountBlock}>
            <Text style={s.amountLabel}>Amount</Text>
            <View style={s.amountRow}>
              {/* Left: big fiat amount with AED symbol */}
              <View style={{ flex: 1 }}>
                <View style={s.amountInputRow}>
                  <Text style={s.currencySymbol}>AED</Text>
                  <TextInput
                    style={s.amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                  />
                </View>
                <Text style={s.amountEquiv}>≈ PUSD</Text>
              </View>
              {/* Right: token pill */}
              <View>
                <TouchableOpacity style={s.tokenPill} activeOpacity={0.85}>
                  <View style={s.tokenDot} />
                  <Text style={s.tokenPillText}>PUSD</Text>
                  <Ionicons name="chevron-down" size={12} color={MUTED} />
                </TouchableOpacity>
                <Text style={s.balanceText}>Balance: 0.00 PUSD</Text>
              </View>
            </View>
          </View>

          {/* CTA — full width lime pill, Image 2 exact */}
          <TouchableOpacity
            style={s.ctaBtn}
            onPress={() => setStep('confirm')}
            activeOpacity={0.85}
          >
            <Text style={s.ctaBtnText}>Send</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── SELECT BANK MODAL — Image 3 exact ─────────────── */}
      <Modal visible={bankModalVisible} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <Animated.View entering={SlideInUp.springify()} style={s.bankModal}>

            {/* Modal header — "Select Bank" lime + × */}
            <View style={s.bankModalHeader}>
              <Text style={s.bankModalTitle}>Select Bank</Text>
              <TouchableOpacity onPress={() => setBankModalVisible(false)} activeOpacity={0.85}>
                <Ionicons name="close" size={20} color={MUTED} />
              </TouchableOpacity>
            </View>

            {/* Search input — Image 3 exact */}
            <View style={s.searchRow}>
              <Ionicons name="search-outline" size={14} color={MUTED} />
              <TextInput
                style={s.searchInput}
                placeholder="Search"
                placeholderTextColor={MUTED}
                value={bankSearch}
                onChangeText={setBankSearch}
              />
            </View>

            {/* Column label — "Bank" with lime underline, Image 3 exact */}
            <Text style={s.bankColumnLabel}>Bank</Text>
            <View style={s.bankColumnUnderline} />

            {/* Bank list — Image 3: logo circle + name, no chevron */}
            <FlatList
              data={filteredBanks}
              keyExtractor={i => i.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.bankRow}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedBank(item);
                    setBankModalVisible(false);
                    setBankSearch('');
                  }}
                >
                  {/* Colored circle with initial — replicates bank logos in Image 3 */}
                  <View style={[s.bankLogoCircle, { backgroundColor: item.color }]}>
                    <Text style={s.bankLogoInitial}>{item.initials}</Text>
                  </View>
                  <Text style={s.bankRowName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );

  // ── STEP: CONFIRM ───────────────────────────────────────────
  // Image 4: dark modal, "Confirm Transaction" lime title, × orange btn, rows, lime Confirm btn
  if (step === 'confirm') return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={s.confirmWrapper}>
        <Animated.View entering={FadeInUp.springify()} style={s.confirmCard}>

          {/* Header — lime title + × button (Image 4) */}
          <View style={s.confirmHeader}>
            <Text style={s.confirmTitle}>Confirm Transaction</Text>
            <TouchableOpacity style={s.closeXBtn} onPress={() => setStep('form')} activeOpacity={0.85}>
              <Ionicons name="close" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Rows — exact Image 4 layout */}
          {[
            { label: 'Service',        value: 'Bank Transfer' },
            { label: 'Bank',           value: selectedBank?.name || '—' },
            { label: 'Account Number', value: accountNumber ? accountNumber.slice(0,-2) + '**' : '—' },
            { label: 'Account Name',   value: 'RECIPIENT' },
          ].map((row, i) => (
            <View key={i} style={s.confirmRow}>
              <Text style={s.confirmRowLabel}>{row.label}</Text>
              <Text style={s.confirmRowValue}>{row.value}</Text>
            </View>
          ))}

          {/* Token Amount row — has subtle border box in Image 4 */}
          <View style={[s.confirmRow, s.confirmRowBoxed]}>
            <Text style={s.confirmRowLabel}>Token Amount</Text>
            <Text style={s.confirmRowValue}>{amount ? (parseFloat(amount)/1350).toFixed(5) : '0.00000'} PUSD</Text>
          </View>

          {/* Amount row — also boxed */}
          <View style={[s.confirmRow, s.confirmRowBoxed]}>
            <Text style={s.confirmRowLabel}>Amount</Text>
            <Text style={s.confirmRowValue}>{amount || '0'} AED</Text>
          </View>

          {/* Confirm CTA — lime full width */}
          <TouchableOpacity style={[s.ctaBtn, { shadowColor: LIME, shadowOffset: {width:0, height:4}, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 }]} onPress={() => setStep('success')} activeOpacity={0.85}>
            <Text style={s.ctaBtnText}>Confirm</Text>
          </TouchableOpacity>

          {/* Footer — "Processed by Obolus Network" tiny centered, Image 4 exact */}
          <View style={s.processedRow}>
            <View style={s.processedDot} />
            <Text style={s.processedText}>Processed by Obolus Network</Text>
          </View>

        </Animated.View>
      </View>
    </SafeAreaView>
  );

  // ── STEP: SUCCESS ───────────────────────────────────────────
  // Image 5: green checkmark, TRANSFER SUCCESSFUL, big amount, dashed divider, receipt rows, Done btn
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={s.successScroll} showsVerticalScrollIndicator={false}>

        {/* Green checkmark circle — Image 5 exact: thin ring, filled check */}
        <View style={s.checkRing}>
          <View style={s.checkCircle}>
            <Ionicons name="checkmark" size={28} color="#000" />
          </View>
        </View>

        {/* Labels */}
        <Text style={s.successLabel}>TRANSFER SUCCESSFUL</Text>
        <Text style={s.successAmount}>AED {amount || '0'}</Text>
        <Text style={s.successEquiv}>≈ {amount ? (parseFloat(amount)/1350).toFixed(4) : '0.0000'} PUSD</Text>

        {/* Dashed divider — Image 5 exact: dotted line */}
        <View style={s.dashedDivider}>
          {[...Array(20)].map((_, i) => (
            <View key={i} style={s.dashDot} />
          ))}
        </View>

        {/* Receipt rows — Image 5 exact layout */}
        {[
          { label: 'Recipient',       value: 'RECIPIENT',              isStatus: false },
          { label: 'Account Number',  value: accountNumber ? accountNumber.slice(0,-2)+'**' : '—', isStatus: false },
          { label: 'Bank',            value: selectedBank?.name || '—',isStatus: false },
          { label: 'Date',            value: new Date().toLocaleString('en-AE', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }), isStatus: false },
          { label: 'Status',          value: 'Successful',             isStatus: true  },
          { label: 'Sender',          value: '↪ Obolus Rail',          isStatus: false },
        ].map((row, i) => (
          <View key={i} style={s.receiptRow}>
            <Text style={s.receiptLabel}>{row.label}</Text>
            <Text style={[s.receiptValue, row.isStatus && { color: EMERALD }]}>
              {row.value}
            </Text>
          </View>
        ))}

        {/* Done CTA */}
        <TouchableOpacity style={[s.ctaBtn, { marginTop: 24, shadowColor: LIME, shadowOffset: {width:0, height:4}, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 }]} onPress={() => router.replace('/')} activeOpacity={0.85}>
          <Text style={s.ctaBtnText}>Done</Text>
        </TouchableOpacity>

        {/* Footer logo — Image 5: small "airbills" bottom, we use "obolus" */}
        <Text style={s.footerLogo}>obolus</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: BG },
  formScroll:       { padding: 20, paddingBottom: 60 },

  // FORM HEADER
  formHeader:       { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 28 },
  backBtn:          { width: 36, height: 36, borderRadius: 18, backgroundColor: SURFACE2, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  headerText:       { flex: 1 },
  headerTitle:      { fontFamily: 'Syne_700Bold', fontSize: 20, color: '#fff', lineHeight: 26 },
  headerSub:        { fontFamily: 'Inter_400Regular', fontSize: 13, color: MUTED, marginTop: 3 },

  // FIELDS
  inputRow:         { flexDirection: 'row', alignItems: 'center', backgroundColor: SURFACE2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 12, borderWidth: 1, borderColor: BORDER },
  textInput:        { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 14, color: '#fff', height: 48 },
  pasteBtn:         { backgroundColor: SURFACE3, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  pasteBtnText:     { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: '#fff' },
  dropdownField:    { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: SURFACE2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 14, marginBottom: 16, borderWidth: 1, borderColor: BORDER },
  bankIconCircle:   { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  bankInitial:      { fontFamily: 'Manrope_700Bold', fontSize: 12, color: '#fff' },
  dropdownText:     { fontFamily: 'Inter_400Regular', fontSize: 14 },

  // AMOUNT BLOCK
  amountBlock:      { backgroundColor: SURFACE2, borderRadius: 14, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: BORDER },
  amountLabel:      { fontFamily: 'Inter_400Regular', fontSize: 12, color: MUTED, marginBottom: 8 },
  amountRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  amountInputRow:   { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  currencySymbol:   { fontFamily: 'Manrope_700Bold', fontSize: 20, color: '#fff' },
  amountInput:      { fontFamily: 'Manrope_700Bold', fontSize: 28, color: '#fff', minWidth: 60 },
  amountEquiv:      { fontFamily: 'Inter_400Regular', fontSize: 11, color: MUTED, marginTop: 3 },
  tokenPill:        { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#1e3a5f', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10 },
  tokenDot:         { width: 16, height: 16, borderRadius: 8, backgroundColor: LIME },
  tokenPillText:    { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: '#fff' },
  balanceText:      { fontFamily: 'Inter_400Regular', fontSize: 10, color: MUTED, marginTop: 4, textAlign: 'right' },

  // CTA
  ctaBtn:           { backgroundColor: LIME, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  ctaBtnText:       { fontFamily: 'Manrope_700Bold', fontSize: 16, color: '#000' },

  // BANK MODAL — Image 3
  modalOverlay:     { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  bankModal:        { backgroundColor: SURFACE, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '85%' },
  bankModalHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  bankModalTitle:   { fontFamily: 'Syne_700Bold', fontSize: 22, color: LIME },
  searchRow:        { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: SURFACE2, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12, borderWidth: 1, borderColor: BORDER },
  searchInput:      { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 13, color: '#fff' },
  bankColumnLabel:  { fontFamily: 'Inter_400Regular', fontSize: 12, color: MUTED, marginBottom: 4 },
  bankColumnUnderline:{ height: 1, backgroundColor: LIME, marginBottom: 8 },
  bankRow:          { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  bankLogoCircle:   { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  bankLogoInitial:  { fontFamily: 'Manrope_700Bold', fontSize: 13, color: '#fff' },
  bankRowName:      { fontFamily: 'Manrope_500Medium', fontSize: 14, color: '#fff' },

  // CONFIRM — Image 4
  confirmWrapper:   { flex: 1, justifyContent: 'center', padding: 20 },
  confirmCard:      { backgroundColor: SURFACE, borderRadius: 20, padding: 20 },
  confirmHeader:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  confirmTitle:     { fontFamily: 'Syne_700Bold', fontSize: 20, color: LIME },
  closeXBtn:        { width: 30, height: 30, borderRadius: 15, backgroundColor: LIME, alignItems: 'center', justifyContent: 'center' },
  confirmRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: BORDER },
  confirmRowBoxed:  { borderWidth: 1, borderColor: BORDER, borderRadius: 10, paddingHorizontal: 10, marginVertical: 4, borderBottomWidth: 1 },
  confirmRowLabel:  { fontFamily: 'Inter_400Regular', fontSize: 12, color: MUTED },
  confirmRowValue:  { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: '#fff' },
  processedRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 14 },
  processedDot:     { width: 14, height: 14, borderRadius: 7, backgroundColor: LIME },
  processedText:    { fontFamily: 'Inter_400Regular', fontSize: 10, color: MUTED },

  // SUCCESS — Image 5
  successScroll:    { alignItems: 'center', padding: 24, paddingBottom: 60 },
  checkRing:        { width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: EMERALD, alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginTop: 20 },
  checkCircle:      { width: 52, height: 52, borderRadius: 26, backgroundColor: EMERALD, alignItems: 'center', justifyContent: 'center' },
  successLabel:     { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: MUTED, letterSpacing: 2, marginBottom: 8 },
  successAmount:    { fontFamily: 'Syne_700Bold', fontSize: 34, color: '#fff', marginBottom: 4 },
  successEquiv:     { fontFamily: 'Inter_400Regular', fontSize: 13, color: MUTED, marginBottom: 20 },
  dashedDivider:    { flexDirection: 'row', gap: 4, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center', width: '100%' },
  dashDot:          { width: 6, height: 2, borderRadius: 1, backgroundColor: BORDER },
  receiptRow:       { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#111' },
  receiptLabel:     { fontFamily: 'Inter_400Regular', fontSize: 12, color: MUTED },
  receiptValue:     { fontFamily: 'Manrope_500Medium', fontSize: 13, color: '#fff' },
  footerLogo:       { fontFamily: 'Syne_700Bold', fontSize: 13, color: FAINT, marginTop: 20 },
});
