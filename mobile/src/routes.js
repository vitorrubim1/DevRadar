import { createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//IMPORTANDO AS PÁGINAS
import Main from './pages/Main'; 
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        //Rotas
        Main:{
            screen: Main,
            navigationOptions:{
                title: 'DevRadar'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions:{
                title: "Perfil no Github"
            }
        },
    }, {
        defaultNavigationOptions:{
            headerTintColor: '#FFF', // TEXTO DO NAVBAR 
            headerBackTitleVisible: false, 
            headerStyle:{
                backgroundColor: '#7D40E7'
            }
        }
    })
);

export default Routes;

