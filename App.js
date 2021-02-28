import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}


function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}  // スクリーン内にいながら title を変更できる
      />
      <Button
        title="Go to HeaderCustomized"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('HeaderCustomized');
        }}
      />
      <Button
        title="Go to HeaderInteraction"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('HeaderInteraction');
        }}
      />
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Custom profile header' })
        }
      />
      <Button
        title="Go to TabHome"
        onPress={() => navigation.navigate('TabHome')}
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function LogoTitle() {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
      <Text>Text</Text>
      <Ionicons name="md-checkmark-circle" size={32} color="white"/>
    </View>
  );
}

function HeaderCustomizedScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}


function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}


function HeaderInteractionScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({ // header からコンポーネント要素にアクセスしたい場合は setOptions を使用する
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return <Text>Count: {count}</Text>;
}

const Stack = createStackNavigator();





const Tab = createBottomTabNavigator();


function TabHome() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

          if (route.name === 'Feed') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
          }

            // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Feed" options={{ tabBarBadge: 3 }} component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Feed screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

    </View>
  );
}
function Messages({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Messages screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

    </View>
  );
}



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{  //全スクリーン共通のスタイリング
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Overview',
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="TabHome"
          component={TabHome}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })} // HomeScreenのonPressの引数で name が渡されている
        />
        <Stack.Screen
          name="HeaderCustomized"
          component={HeaderCustomizedScreen}
          options={{
            title: 'My home',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitle: props => <LogoTitle {...props} />
          }}
        />
        <Stack.Screen
          name="HeaderInteraction"
          component={HeaderInteractionScreen}
          options={({ navigation, route }) => ({
            headerTitle: props => <LogoTitle {...props} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// It might be tempting to try to use this.props inside of options, but because it is defined before the component is rendered, this does not refer to an instance of the component and therefore no props are available.
