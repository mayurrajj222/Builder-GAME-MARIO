#!/bin/bash

# 🚀 Super Dudu & Bubu - Mobile APK Build Script
echo "🎮 Building Super Dudu & Bubu Mobile APK..."

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Check if EAS CLI is installed  
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g eas-cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --prefix . -f package.mobile.json

# Setup EAS project (first time only)
echo "🔧 Setting up EAS project..."
eas init --id super-dudu-bubu-game

# Build APK
echo "🏗️ Building APK..."
eas build --platform android --profile preview --local

echo "✅ APK build complete!"
echo "📁 Check the 'dist' folder for your APK file"
echo ""
echo "🎮 To install on Android device:"
echo "   1. Enable 'Unknown Sources' in Android settings"
echo "   2. Transfer APK to device"  
echo "   3. Tap APK file to install"
echo ""
echo "📱 To publish to Google Play Store:"
echo "   eas build --platform android --profile production"
echo "   eas submit --platform android"
