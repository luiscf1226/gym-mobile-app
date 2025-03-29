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

## Generic Components

### 1. Button
A customizable button component with various styles and states.

```tsx
import { Button } from '../components/ui/Button';

<Button
  variant="primary"
  size="medium"
  onPress={() => {}}
  disabled={false}
  loading={false}
  leftIcon={<IconSymbol name="plus" />}
  rightIcon={<IconSymbol name="arrow.right" />}
>
  Click Me
</Button>
```

**Props:**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}
```

### 2. Input
A flexible text input component with various configurations.

```tsx
import { Input } from '../components/ui/Input';

<Input
  label="Username"
  placeholder="Enter username"
  value={value}
  onChangeText={setValue}
  error="Invalid input"
  leftIcon={<IconSymbol name="person" />}
  rightIcon={<IconSymbol name="xmark" />}
  onRightIconPress={() => setValue('')}
/>
```

**Props:**
```tsx
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}
```

### 3. Card
A container component with shadow and border radius.

```tsx
import { Card } from '../components/ui/Card';

<Card
  onPress={() => {}}
  elevation={2}
  style={{ padding: 16 }}
>
  <Text>Card Content</Text>
</Card>
```

**Props:**
```tsx
interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevation?: number;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  borderRadius?: number;
  backgroundColor?: string;
}
```

### 4. Text
Typography component with predefined styles and variants.

```tsx
import { Text } from '../components/ui/Text';

<Text
  variant="h1"
  weight="bold"
  color="primary"
>
  Hello World
</Text>
```

**Props:**
```tsx
interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'error' | 'success' | string;
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
  children: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}
```

### 5. Avatar
User avatar component with image or initials fallback.

```tsx
import { Avatar } from '../components/ui/Avatar';

<Avatar
  source={{ uri: 'https://example.com/avatar.jpg' }}
  initials="JD"
  size={40}
  borderColor="primary"
/>
```

**Props:**
```tsx
interface AvatarProps {
  source?: ImageSourcePropType;
  initials?: string;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  style?: ViewStyle;
}
```

### 6. Badge
Small status indicator or counter.

```tsx
import { Badge } from '../components/ui/Badge';

<Badge
  count={5}
  variant="error"
  size="small"
/>
```

**Props:**
```tsx
interface BadgeProps {
  count?: number;
  variant?: 'primary' | 'error' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  maxCount?: number;
  dot?: boolean;
}
```

### 7. List
Customizable list component with various item layouts.

```tsx
import { List } from '../components/ui/List';

<List
  data={items}
  renderItem={({ item }) => (
    <List.Item
      title={item.title}
      subtitle={item.subtitle}
      leftIcon={<IconSymbol name={item.icon} />}
      rightIcon={<IconSymbol name="chevron.right" />}
      onPress={() => handlePress(item)}
    />
  )}
  separatorStyle={{ height: 1, backgroundColor: '#eee' }}
/>
```

**Props:**
```tsx
interface ListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  ItemSeparatorComponent?: React.ComponentType;
  separatorStyle?: ViewStyle;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}
```

### 8. Modal
Customizable modal component with various animations.

```tsx
import { Modal } from '../components/ui/Modal';

<Modal
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  animationType="slide"
  height={300}
>
  <Modal.Header title="Modal Title" />
  <Modal.Content>
    <Text>Modal content goes here</Text>
  </Modal.Content>
  <Modal.Footer>
    <Button onPress={() => setIsVisible(false)}>Close</Button>
  </Modal.Footer>
</Modal>
```

**Props:**
```tsx
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  animationType?: 'none' | 'slide' | 'fade';
  height?: number | string;
  width?: number | string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  backdropStyle?: ViewStyle;
  children: React.ReactNode;
}
```

### 9. Checkbox
Customizable checkbox component with various states.

```tsx
import { Checkbox } from '../components/ui/Checkbox';

<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Remember me"
  disabled={false}
/>
```

**Props:**
```tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}
```

### 10. Switch
Toggle switch component with customizable styles.

```tsx
import { Switch } from '../components/ui/Switch';

<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  disabled={false}
  label="Enable notifications"
/>
```

**Props:**
```tsx
interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  trackColor?: { false: string; true: string };
  thumbColor?: string;
}
```

## Usage with Theme

All components support theme customization through the ThemeProvider:

```tsx
import { ThemeProvider } from '../components/ui/ThemeProvider';

const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    background: '#FFFFFF',
    text: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 32, lineHeight: 40 },
    h2: { fontSize: 24, lineHeight: 32 },
    body: { fontSize: 16, lineHeight: 24 },
  },
  // ... other theme values
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Composition Example

Here's how to compose multiple components together:

```tsx
import { Card, Text, Button, Stack } from '../components/ui';

function ProductCard({ product }) {
  return (
    <Card style={{ padding: 16 }}>
      <Stack spacing={8}>
        <Text variant="h2">{product.name}</Text>
        <Text variant="body">{product.description}</Text>
        <Text variant="h3" color="primary">${product.price}</Text>
        <Button 
          variant="primary"
          onPress={() => handleBuy(product)}
          leftIcon={<IconSymbol name="cart" />}
        >
          Add to Cart
        </Button>
      </Stack>
    </Card>
  );
}
```

## Responsive Design

All components support responsive design through style props and the useWindowDimensions hook:

```tsx
import { useWindowDimensions } from 'react-native';
import { Card, Stack } from '../components/ui';

function ResponsiveLayout() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  return (
    <Stack
      direction={isSmallScreen ? 'vertical' : 'horizontal'}
      spacing={isSmallScreen ? 16 : 24}
    >
      <Card style={{ flex: isSmallScreen ? 0 : 1 }}>
        {/* Content */}
      </Card>
    </Stack>
  );
}
``` 