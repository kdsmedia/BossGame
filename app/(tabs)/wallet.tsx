import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';
import { Fonts } from '@/constants/fonts';
import { useGame } from '@/hooks/useGame';
import { useAlert } from '@/template';

const COIN_RATE = 10; // 1 coin = Rp 10

type PaymentMethod = 'DANA' | 'OVO' | null;

export default function WalletScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { coins, adsWatched, lastWithdrawalDate, canWithdraw, setLastWithdrawalDate, addAdsWatched } = useGame();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const coinsInRupiah = coins * COIN_RATE;
  const minWithdrawCoins = Math.ceil(10000 / COIN_RATE); // 1000 coins
  const adsRemaining = Math.max(0, 350 - adsWatched);
  const today = new Date().toISOString().split('T')[0];
  const alreadyWithdrawnToday = lastWithdrawalDate === today;
  const isUnlocked = adsWatched >= 350;
  const withdrawable = canWithdraw();

  const handleWithdraw = () => {
    if (!withdrawable) return;
    if (!selectedMethod) {
      showAlert('Pilih Metode', 'Pilih DANA atau OVO terlebih dahulu.');
      return;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      showAlert('Nomor Tidak Valid', 'Masukkan nomor handphone yang valid.');
      return;
    }
    const amount = parseInt(withdrawAmount, 10);
    if (isNaN(amount) || amount < 10000) {
      showAlert('Jumlah Tidak Valid', 'Minimal penarikan adalah Rp 10.000');
      return;
    }
    const requiredCoins = Math.ceil(amount / COIN_RATE);
    if (requiredCoins > coins) {
      showAlert('Koin Tidak Cukup', `Kamu butuh ${requiredCoins.toLocaleString('id-ID')} koin untuk menarik Rp ${amount.toLocaleString('id-ID')}`);
      return;
    }

    showAlert(
      'Konfirmasi Penarikan',
      `Tarik Rp ${amount.toLocaleString('id-ID')} ke ${selectedMethod} ${phoneNumber}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya, Tarik',
          onPress: () => {
            setLastWithdrawalDate(today);
            showAlert('Penarikan Diproses! 🎉', `Rp ${amount.toLocaleString('id-ID')} sedang diproses ke ${selectedMethod} ${phoneNumber}. Estimasi 1x24 jam.`);
            setWithdrawAmount('');
            setPhoneNumber('');
          },
        },
      ]
    );
  };

  const handleWatchAd = () => {
    addAdsWatched(1);
    showAlert('Iklan Selesai! ✅', `Progress: ${adsWatched + 1}/350 iklan.`);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>💰 Dompet</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}>

          {/* Balance Card */}
          <LinearGradient colors={[Colors.surfaceLight, Colors.surface]} style={styles.balanceCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.balanceRow}>
              <Image source={require('@/assets/images/gold_coin.png')} style={styles.balanceCoinIcon} contentFit="contain" />
              <View>
                <Text style={styles.balanceCoins}>{coins.toLocaleString('id-ID')} Koin</Text>
                <Text style={styles.balanceRupiah}>≈ Rp {coinsInRupiah.toLocaleString('id-ID')}</Text>
              </View>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.rateRow}>
              <MaterialIcons name="info-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.rateText}>1 Koin = Rp {COIN_RATE} · Min. Tarik Rp 10.000</Text>
            </View>
          </LinearGradient>

          {/* Ads Progress */}
          <View style={styles.adsSection}>
            <View style={styles.adsSectionHeader}>
              <MaterialIcons name="ondemand-video" size={20} color={Colors.gold} />
              {isUnlocked ? (
                <View style={styles.unlockedBadge}><Text style={styles.unlockedText}>TERBUKA ✓</Text></View>
              ) : (
                <Text style={styles.adsProgressText}>{adsWatched}/350</Text>
              )}
            </View>
            <View style={styles.adsProgress}>
              <View style={styles.adsProgressBar}>
                <View style={[styles.adsProgressFill, { width: `${Math.min(100, (adsWatched / 350) * 100)}%` }]} />
              </View>
            </View>
            {!isUnlocked && (
              <Pressable style={styles.watchAdBtn} onPress={handleWatchAd}>
                <MaterialIcons name="play-circle-filled" size={22} color={Colors.backgroundDeep} />
              </Pressable>
            )}
          </View>

          {/* Withdrawal Section */}
          <View style={[styles.withdrawSection, !isUnlocked && styles.withdrawLocked]}>
            <View style={styles.withdrawHeader}>
              <MaterialIcons name="account-balance-wallet" size={20} color={isUnlocked ? Colors.gold : Colors.textMuted} />
              <Text style={[styles.withdrawTitle, !isUnlocked && styles.withdrawTitleLocked]}>Penarikan Saldo</Text>
              {!isUnlocked && <MaterialIcons name="lock" size={16} color={Colors.textMuted} />}
            </View>

            {alreadyWithdrawnToday && (
              <View style={styles.limitBadge}>
                <MaterialIcons name="warning" size={14} color={Colors.warning} />
                <Text style={styles.limitText}>Batas 1x penarikan per hari sudah terpakai</Text>
              </View>
            )}

            {/* Method Selection */}
            <Text style={styles.fieldLabel}>Pilih Metode Pembayaran</Text>
            <View style={styles.methodRow}>
              {(['DANA', 'OVO'] as PaymentMethod[]).map((method) => (
                <Pressable
                  key={method}
                  style={[styles.methodCard, selectedMethod === method && styles.methodCardActive]}
                  onPress={() => isUnlocked && setSelectedMethod(method)}
                  disabled={!isUnlocked}
                >
                  <Image
                    source={method === 'DANA' ? require('@/assets/images/logo_dana.png') : require('@/assets/images/logo_ovo.png')}
                    style={styles.methodLogo}
                    contentFit="contain"
                  />
                </Pressable>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Nomor Handphone</Text>
            <TextInput
              style={[styles.input, !isUnlocked && styles.inputDisabled]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="08xxxxxxxxxx"
              placeholderTextColor={Colors.textMuted}
              keyboardType="phone-pad"
              editable={isUnlocked}
              maxLength={13}
            />

            <Text style={styles.fieldLabel}>Jumlah Penarikan (Rupiah)</Text>
            <TextInput
              style={[styles.input, !isUnlocked && styles.inputDisabled]}
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
              placeholder="Min. Rp 10.000"
              placeholderTextColor={Colors.textMuted}
              keyboardType="numeric"
              editable={isUnlocked}
            />

            {withdrawAmount ? (
              <Text style={styles.coinCalc}>
                = {Math.ceil(parseInt(withdrawAmount || '0', 10) / COIN_RATE).toLocaleString('id-ID')} Koin akan dipotong
              </Text>
            ) : null}

            <Pressable
              style={[styles.withdrawBtn, !withdrawable && styles.withdrawBtnDisabled]}
              onPress={handleWithdraw}
              disabled={!withdrawable}
            >
              <LinearGradient
                colors={withdrawable ? [Colors.goldLight, Colors.gold, Colors.goldDark] : [Colors.surfaceLight, Colors.surface]}
                style={styles.withdrawBtnGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <MaterialIcons name="send" size={20} color={withdrawable ? Colors.backgroundDeep : Colors.textMuted} />
                <Text style={[styles.withdrawBtnText, !withdrawable && styles.withdrawBtnTextDisabled]}>
                  TARIK SALDO
                </Text>
              </LinearGradient>
            </Pressable>
          </View>


        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundDeep },
  headerBar: { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.surfaceLight },
  headerTitle: { fontFamily: Fonts.title, fontSize: 22, fontWeight: '800', color: Colors.gold, letterSpacing: 1 },
  content: { padding: 20, gap: 16 },
  balanceCard: { borderRadius: 20, padding: 20, borderWidth: 1, borderColor: Colors.goldDark },
  balanceRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  balanceCoinIcon: { width: 52, height: 52 },
  balanceCoins: { fontFamily: Fonts.number, fontSize: 28, fontWeight: '900', color: Colors.gold },
  balanceRupiah: { fontFamily: Fonts.number, fontSize: 16, color: Colors.textSecondary, marginTop: 2 },
  balanceDivider: { height: 1, backgroundColor: Colors.surfaceLight, marginVertical: 12 },
  rateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rateText: { fontFamily: Fonts.text, fontSize: 12, color: Colors.textMuted },
  adsSection: { backgroundColor: Colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.surfaceLight },
  adsSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  adsSectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, flex: 1 },
  adsProgressText: { fontFamily: Fonts.number, fontSize: 13, color: Colors.gold, fontWeight: '700' },
  unlockedBadge: { backgroundColor: Colors.walletGreen, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  unlockedText: { fontFamily: Fonts.button, fontSize: 10, color: '#fff', fontWeight: '700' },
  adsProgress: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  adsProgressBar: { flex: 1, height: 8, backgroundColor: Colors.backgroundDeep, borderRadius: 4, overflow: 'hidden' },
  adsProgressFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 4 },

  watchAdBtn: { alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.gold, alignSelf: 'center', marginTop: 4 },
  withdrawSection: { backgroundColor: Colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.surfaceLight },
  withdrawLocked: { opacity: 0.6 },
  withdrawHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  withdrawTitle: { fontFamily: Fonts.title, fontSize: 16, fontWeight: '700', color: Colors.textPrimary, flex: 1 },
  withdrawTitleLocked: { color: Colors.textMuted },
  limitBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(245,158,11,0.15)', borderRadius: 8, padding: 10, marginBottom: 12 },
  limitText: { fontFamily: Fonts.text, fontSize: 12, color: Colors.warning, flex: 1 },
  fieldLabel: { fontFamily: Fonts.text, fontSize: 12, color: Colors.textSecondary, marginBottom: 6, marginTop: 12, letterSpacing: 0.5, fontWeight: '600' },
  methodRow: { flexDirection: 'row', gap: 12 },
  methodCard: { flex: 1, backgroundColor: Colors.backgroundDeep, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 2, borderColor: Colors.surfaceLight },
  methodCardActive: { borderColor: Colors.gold, backgroundColor: 'rgba(255,215,0,0.08)' },
  methodLogo: { width: 80, height: 40 },
  input: {
    fontFamily: Fonts.text,
    backgroundColor: Colors.backgroundDeep, borderRadius: 12, padding: 14,
    color: Colors.textPrimary, fontSize: 15, borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  inputDisabled: { opacity: 0.5 },
  coinCalc: { fontFamily: Fonts.number, fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  withdrawBtn: { borderRadius: 50, overflow: 'hidden', marginTop: 16 },
  withdrawBtnDisabled: { opacity: 0.7 },
  withdrawBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, gap: 8 },
  withdrawBtnText: { fontFamily: Fonts.button, fontSize: 16, fontWeight: '900', color: Colors.backgroundDeep, letterSpacing: 2 },
  withdrawBtnTextDisabled: { color: Colors.textMuted },

});
