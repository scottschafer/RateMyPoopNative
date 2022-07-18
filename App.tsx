import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RateDialog } from './src/components/RateDialog';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { store } from './src/store';
import { observer } from 'mobx-react-lite';
import { Text } from './src/components/Themed';

const App = observer(() => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Text>Hello world</Text>

        {
          <>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            {/* <RateDialog
              visible={store.showingRegisterPoop}
              onClose={store.handleCancelRegisterPoop} /> */}
            <StatusBar />
          </SafeAreaProvider>
          </>
        }
      </>
    );
  }
});

export default App;