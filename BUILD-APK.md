# 📱 Build Super Dudu & Bubu APK

## 🚀 Quick Start (Using Build Script)

```bash
# Make the build script executable and run it
chmod +x build-mobile.sh
./build-mobile.sh
```

## 📋 Manual Build Process

### Step 1: Install Required Tools

```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Install EAS CLI for building
npm install -g eas-cli
```

### Step 2: Setup Project

```bash
# Copy mobile package.json
cp package.mobile.json package.json

# Install mobile dependencies
npm install

# Initialize EAS project
eas init
```

### Step 3: Build APK

```bash
# Build APK for testing (faster)
eas build --platform android --profile preview

# Build production APK for distribution
eas build --platform android --profile production
```

### Step 4: Download Your APK

1. After build completes, EAS will provide a download link
2. Download the APK file to your computer
3. Install on Android device by enabling "Unknown Sources" and tapping the APK

## 📱 APK Install Instructions

### For Android Users:

1. **Enable Unknown Sources:**

   - Settings → Security → Unknown Sources → Enable
   - Or Settings → Apps & Notifications → Special App Access → Install Unknown Apps

2. **Install APK:**

   - Download APK file to your device
   - Tap the APK file in your Downloads folder
   - Follow installation prompts
   - Launch "Super Dudu & Bubu" from your app drawer

3. **Game Controls:**
   - 🎮 Landscape mode is automatically enforced
   - 🕹️ Use on-screen controls (left/right arrows, jump, run buttons)
   - ⏸️ Pause button in top corner
   - 🔄 Swipe gestures supported

## 🏪 Distribution Options

### 1. Direct Distribution

- Share APK file directly with users
- Users install manually via "Unknown Sources"
- Best for beta testing and personal use

### 2. Google Play Store

```bash
# Build production bundle
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

### 3. Alternative App Stores

- Amazon Appstore
- Samsung Galaxy Store
- F-Droid (for open source)
- APKPure, APKMirror

## 📊 Build Profiles

### Preview (Development/Testing)

- **Size:** ~25-30 MB
- **Build Time:** 5-10 minutes
- **Features:** Debug info, faster build
- **Use Case:** Testing, beta distribution

### Production (Release)

- **Size:** ~15-20 MB
- **Build Time:** 10-15 minutes
- **Features:** Optimized, minified, signed
- **Use Case:** App store submission, final release

## 🔧 Troubleshooting

### Build Fails

```bash
# Clear cache and retry
expo r -c
eas build --platform android --profile preview --clear-cache
```

### APK Won't Install

- Ensure "Unknown Sources" is enabled
- Check Android version compatibility (minimum Android 6.0)
- Try installing via ADB: `adb install app.apk`

### Performance Issues

- Game automatically locks to landscape orientation
- Uses hardware acceleration for smooth gameplay
- Optimized for 60 FPS on modern devices

## 📋 APK Features

✅ **Landscape Orientation Lock**  
✅ **Touch Controls Optimized**  
✅ **Full 15 Levels**  
✅ **2 Playable Characters**  
✅ **Offline Gameplay**  
✅ **No Internet Required**  
✅ **60 FPS Smooth Gameplay**  
✅ **Mobile-Optimized UI**  
✅ **Haptic Feedback**  
✅ **Auto-Save Progress**

## 💡 Tips for Success

1. **Test on Multiple Devices**: Different screen sizes and Android versions
2. **Optimize Performance**: Monitor FPS and memory usage
3. **User Feedback**: Collect feedback from beta testers
4. **Version Control**: Keep track of different APK versions
5. **Security**: Sign your APK properly for Play Store submission

---

🎮 **Your Super Dudu & Bubu mobile game is ready to conquer the world!** 🌍
