import { Tabs } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const router = useRouter();
  // tabs: [0]=Home [1]=Portfolio [2]=Credit [3]=Profile
  // floating Send button sits between index 1 and 2

  return (
    <View style={styles.tabBarWrapper}>
      {/* BlurView background — iOS only */}
      {Platform.OS === 'ios' ? (
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]} />
      )}

      <View style={styles.tabBarInner}>
        {/* Tab 0: Home */}
        <TabItem
          icon="home-outline"
          iconActive="home"
          label="Home"
          isFocused={state.index === 0}
          onPress={() => navigation.navigate(state.routes[0].name)}
        />

        {/* Tab 1: Portfolio */}
        <TabItem
          icon="pie-chart-outline"
          iconActive="pie-chart"
          label="Portfolio"
          isFocused={state.index === 1}
          onPress={() => navigation.navigate(state.routes[1].name)}
        />

        {/* CENTER FLOATING SEND BUTTON */}
        {/* Exact replica of Airbills center button: large black circle, elevated, lime accent */}
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={() => router.push('/send')}
          activeOpacity={0.85}
        >
          <View style={styles.floatingBtnInner}>
            {/* Airbills uses a 4-dot grid icon — we use send/scan */}
            <Ionicons name="scan-outline" size={26} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Tab 2: Credit */}
        <TabItem
          icon="flash-outline"
          iconActive="flash"
          label="Credit"
          isFocused={state.index === 2}
          onPress={() => navigation.navigate(state.routes[2].name)}
        />

        {/* Tab 3: Profile */}
        <TabItem
          icon="person-outline"
          iconActive="person"
          label="Profile"
          isFocused={state.index === 3}
          onPress={() => navigation.navigate(state.routes[3].name)}
        />
      </View>
    </View>
  );
}

function TabItem({ icon, iconActive, label, isFocused, onPress }: any) {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
      {/* Active pill indicator — lime behind icon, exactly like Airbills highlight */}
      {isFocused && <View style={styles.activePill} />}
      <Ionicons
        name={isFocused ? iconActive : icon}
        size={22}
        color={isFocused ? '#000' : '#555'}
        style={{ zIndex: 1 }}
      />
      {/* Show label only when active */}
      {isFocused && (
        <Animated.Text style={styles.tabLabel}>{label}</Animated.Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    overflow: 'hidden',
    borderTopWidth: 0,
  },
  tabBarInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccff00',  // LIME pill behind active icon
  },
  tabLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 9,
    color: '#000',
    marginTop: 2,
    zIndex: 1,
  },
  // FLOATING BUTTON — exact Airbills center circle style
  floatingBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccff00',  // lime bg — Obolus version of Airbills black
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ccff00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 10,
  },
  floatingBtnInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="portfolio" />
      <Tabs.Screen name="credit" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
