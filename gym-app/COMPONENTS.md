# Components Documentation

This document provides a comprehensive guide to all pre-built components available in the Gym App.

## UI Components

### 1. BodyScrollView
A customized ScrollView component that handles keyboard avoidance and safe area insets.

```tsx
import { BodyScrollView } from '../components/ui/BodyScrollView';

<BodyScrollView>
  {/* Your content here */}
</BodyScrollView>
```

**Features:**
- Automatic keyboard avoidance
- Safe area handling
- Pull-to-refresh support
- Customizable padding and insets

### 2. ContentUnavailable
A component for displaying empty states, errors, or loading states.

```tsx
import { ContentUnavailable } from '../components/ui/ContentUnavailable';

<ContentUnavailable 
  title="No Data"
  message="There is no data to display"
  action={<Button title="Refresh" onPress={handleRefresh} />}
/>
```

**Features:**
- Multiple preset states (empty, error, loading)
- Customizable icons and messages
- Action button support
- Animated transitions

### 3. FadeIn
A component that provides fade-in animation for its children.

```tsx
import { FadeIn } from '../components/ui/FadeIn';

<FadeIn>
  <YourComponent />
</FadeIn>
```

**Features:**
- Smooth fade-in animation
- Customizable duration
- Optional delay

### 4. Form Components
A comprehensive form handling system with various input types.

```tsx
import { Form, Input, Select } from '../components/ui/Form';

<Form onSubmit={handleSubmit}>
  <Input 
    name="username"
    label="Username"
    placeholder="Enter username"
  />
  <Select
    name="role"
    label="Role"
    options={roleOptions}
  />
</Form>
```

**Features:**
- Form validation
- Error handling
- Multiple input types
- Custom styling options
- Accessibility support

### 5. Header
A customizable header component for navigation and actions.

```tsx
import { Header } from '../components/ui/Header';

<Header
  title="Dashboard"
  leftAction={<BackButton />}
  rightAction={<SettingsButton />}
/>
```

**Features:**
- Customizable left/right actions
- Title truncation
- Background blur support
- Status bar handling

### 6. IconSymbol
Platform-specific icon component with fallback support.

```tsx
import { IconSymbol } from '../components/ui/IconSymbol';

<IconSymbol
  name="heart.fill"
  color="red"
  size={24}
/>
```

**Features:**
- SF Symbols support on iOS
- Material Icons fallback on Android
- Custom icon support
- Color and size customization

### 7. Segments
A segmented control component for switching between views.

```tsx
import { Segments } from '../components/ui/Segments';

<Segments
  items={['Day', 'Week', 'Month']}
  selectedIndex={selectedIndex}
  onChange={setSelectedIndex}
/>
```

**Features:**
- Smooth animations
- Custom styling
- Accessibility support
- Multiple selection modes

### 8. Skeleton
Loading placeholder component with animation.

```tsx
import { Skeleton } from '../components/ui/Skeleton';

<Skeleton
  width={200}
  height={20}
  variant="text"
/>
```

**Features:**
- Multiple variants (text, circle, rect)
- Customizable dimensions
- Animated shimmer effect
- Platform-specific optimizations

### 9. Stack
Flexible layout component for arranging elements.

```tsx
import { Stack } from '../components/ui/Stack';

<Stack spacing={16} direction="horizontal">
  <Component1 />
  <Component2 />
</Stack>
```

**Features:**
- Horizontal/vertical layout
- Customizable spacing
- Alignment options
- Responsive layout support

### 10. Tabs
Tab navigation component with smooth transitions.

```tsx
import { Tabs } from '../components/ui/Tabs';

<Tabs
  items={[
    { label: 'Profile', content: <ProfileScreen /> },
    { label: 'Settings', content: <SettingsScreen /> }
  ]}
/>
```

**Features:**
- Smooth transitions
- Custom tab styling
- Badge support
- Swipe navigation

### 11. ThemeProvider
Theme context provider for consistent styling.

```tsx
import { ThemeProvider } from '../components/ui/ThemeProvider';

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

**Features:**
- Dark mode support
- Custom theme override
- Dynamic theme switching
- TypeScript support

### 12. TouchableBounce
Enhanced touchable component with bounce animation.

```tsx
import { TouchableBounce } from '../components/ui/TouchableBounce';

<TouchableBounce onPress={handlePress}>
  <YourComponent />
</TouchableBounce>
```

**Features:**
- Bounce animation
- Haptic feedback
- Platform-specific behavior
- Accessibility support

## Layout Components

The `layout` directory contains components for page structure and navigation:

- Navigation containers
- Screen layouts
- Modal presentations
- Tab bar configurations

## Runtime Components

The `runtime` directory contains components that handle:

- Platform-specific implementations
- Device feature detection
- Performance optimizations
- Error boundaries

## Best Practices

1. **Component Usage**
   - Import components from their respective directories
   - Use TypeScript for prop validation
   - Follow the component documentation for proper implementation

2. **Customization**
   - Use theme variables for styling
   - Extend components through composition
   - Maintain consistency across the app

3. **Performance**
   - Use memo for expensive components
   - Implement proper cleanup in useEffect
   - Optimize re-renders with proper state management

4. **Accessibility**
   - Include proper ARIA labels
   - Support screen readers
   - Maintain proper contrast ratios

## Contributing

When creating new components:

1. Follow the existing component structure
2. Include proper TypeScript types
3. Add comprehensive documentation
4. Include usage examples
5. Test across platforms

## Example App Structure

```tsx
import { 
  BodyScrollView,
  Header,
  Stack,
  ThemeProvider
} from '../components/ui';

function MyScreen() {
  return (
    <ThemeProvider>
      <Header title="My Screen" />
      <BodyScrollView>
        <Stack spacing={16}>
          {/* Your content here */}
        </Stack>
      </BodyScrollView>
    </ThemeProvider>
  );
}
```

This structure provides a solid foundation for building consistent and maintainable screens in the app. 