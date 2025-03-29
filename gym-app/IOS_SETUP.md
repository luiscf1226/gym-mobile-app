# iOS Development Guide

This guide provides detailed instructions for setting up and running the Gym App on iOS devices and simulators.

## Prerequisites

1. **Xcode Installation**
   - Install Xcode from the Mac App Store
   - Open Xcode and accept the license agreement
   - Install additional components when prompted

2. **Command Line Tools Setup**
   ```bash
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -license accept
   ```

3. **iOS Simulator Setup**
   - Open Xcode
   - Go to Xcode > Settings > Platforms
   - Download iOS Simulator runtime (latest stable version)

## Development Environment

1. **Install Dependencies**
   ```bash
   bun install
   cd ios && pod install && cd ..
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Configure environment variables for iOS development

## Running the App

### Development Mode with Hot Reloading

1. **Start the Development Server**
   ```bash
   bun start
   ```

2. **Run on iOS Simulator**
   ```bash
   bunx expo run:ios
   ```

3. **Enable Hot Reloading**
   - Press `Cmd + D` in the simulator to open developer menu
   - Enable "Fast Refresh"
   - Changes will automatically reload

### Running on Physical Device

1. **Xcode Setup**
   - Open `ios/GymApp.xcworkspace` in Xcode
   - Sign in with your Apple ID
   - Configure signing & capabilities

2. **Device Setup**
   - Connect your iOS device via USB
   - Trust the developer certificate on your device
   - Select your device in Xcode's device menu

3. **Running**
   ```bash
   bunx expo run:ios --device
   ```

## Troubleshooting

### Common Issues

1. **Simulator Not Showing**
   ```bash
   xcrun simctl erase all
   ```

2. **Build Errors**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

3. **Metro Bundler Issues**
   ```bash
   bun start --reset-cache
   ```

### Debugging

1. **Enable Developer Tools**
   - Press `Cmd + D` in simulator
   - Select "Debug JS Remotely"

2. **Console Logs**
   - Open Safari > Develop > Simulator > [Your App]
   - View console logs in Safari Developer Tools

3. **Performance Monitoring**
   - Enable Performance Monitor from Developer Menu
   - Monitor JS frame rate and memory usage

## Best Practices

1. **Development**
   - Use TypeScript for type safety
   - Follow React Native best practices
   - Test on multiple iOS versions

2. **Performance**
   - Implement proper memory management
   - Use performance profiling tools
   - Optimize image assets

3. **Testing**
   - Test on different device sizes
   - Verify iOS-specific features
   - Check system permissions 