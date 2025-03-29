# Expo Router File Structure Guide

## Overview

Expo Router uses a file-based routing system similar to Next.js, where the file structure in your `app` directory directly maps to your application's routes.

## Basic File Structure

```
app/
├── _layout.tsx        # Root layout
├── +html.tsx         # HTML configuration
├── (tabs)/           # Tab group
│   ├── _layout.tsx   # Tab navigation layout
│   ├── index.tsx     # Home tab
│   ├── profile.tsx   # Profile tab
│   └── settings/     # Nested settings routes
│       ├── _layout.tsx
│       ├── index.tsx
│       └── account.tsx
├── (modals)/         # Modal group
│   ├── _layout.tsx
│   └── settings.tsx
└── (auth)/           # Authentication group
    ├── login.tsx
    └── register.tsx
```

## Special Files and Directories

### 1. Layout Files (`_layout.tsx`)
- Define the layout wrapper for a route segment
- Handle navigation configuration
- Example:
```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
      }}
    />
  );
}
```

### 2. Route Groups (parentheses folders)
- `(tabs)` - Group routes under tab navigation
- `(modals)` - Group modal screens
- `(auth)` - Group authentication screens
- Example:
```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### 3. Dynamic Routes
- Use square brackets for dynamic segments
- Example: `[id].tsx` for dynamic product pages

```
app/
└── products/
    └── [id].tsx    # Matches /products/123
```

### 4. Catch-all Routes
- Use [...param].tsx for catch-all routes
- Handles any number of URL segments

```
app/
└── blog/
    └── [...slug].tsx    # Matches /blog/any/path/here
```

### 5. Index Routes (`index.tsx`)
- Default route for a directory
- Example: `app/index.tsx` is the root route ('/')
- Example: `app/(tabs)/index.tsx` is the default tab

## Navigation Patterns

### 1. Stack Navigation
```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(modals)/settings" 
        options={{ presentation: 'modal' }} 
      />
    </Stack>
  );
}
```

### 2. Tab Navigation
```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### 3. Modal Navigation
```tsx
// app/(modals)/settings.tsx
import { useRouter } from 'expo-router';

export default function SettingsModal() {
  const router = useRouter();
  
  return (
    <View>
      <Button 
        title="Close" 
        onPress={() => router.back()} 
      />
    </View>
  );
}
```

## Best Practices

### 1. Route Organization
- Group related routes in directories
- Use route groups for different navigation patterns
- Keep shared layouts in parent directories

### 2. Navigation State
```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/ui/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="(modals)/settings" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
```

### 3. Type Safety
```tsx
// app/types.ts
export type RootParamList = {
  '(tabs)': undefined;
  '(modals)/settings': undefined;
  'products/[id]': { id: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList {}
  }
}
```

## Common Patterns

### 1. Protected Routes
```tsx
// app/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
```

### 2. Nested Layouts
```
app/
└── (tabs)/
    ├── _layout.tsx
    └── settings/
        ├── _layout.tsx
        ├── index.tsx
        └── profile/
            ├── _layout.tsx
            └── index.tsx
```

### 3. Error Boundaries
```tsx
// app/[...unmatched].tsx
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View>
      <Text>This screen doesn't exist!</Text>
      <Link href="/">Go home</Link>
    </View>
  );
}
```

## Performance Tips

1. **Lazy Loading**
- Use dynamic imports for heavy screens
- Implement loading states for better UX

2. **Route Prefetching**
- Prefetch routes that are likely to be accessed
- Use `router.prefetch('/route')`

3. **Memory Management**
- Clean up resources in route unmount
- Use `useEffect` cleanup functions 