import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import theme from '@theme/index';
import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { Loading } from '@components/loading';
import { Routes } from './src/routes';

export default function App() {

  const[fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      { fontLoaded ? <Routes/> : <Loading/>}
    </ThemeProvider>
  );
}