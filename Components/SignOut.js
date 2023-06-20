import { DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';



  
  const Signout = ({ navigation }) => {
    const user = auth.currentUser;
    const userEmail = user?.email;
    const handleSignOut = () =>{
        auth
        .signOut()
        .then(() =>{
           navigation.navigate("Login")
           console.log("Logged out! " );
     
        })
        .catch(error => alert(error.message))
     }

    return (
      <DrawerContentScrollView>
      {userEmail && (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
            User Email: {userEmail}
          </Text>
        </View>
      )}
        <Drawer.Screen name="Home" component={HomeScreen} />
      
      <DrawerItem
        label="Custom Button"
        onPress={handleSignOut}
        icon={() => <Icon name="custom-icon" />}
      />
      </DrawerContentScrollView>
    );
  };
  
export default Signout
