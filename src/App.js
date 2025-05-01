import { QueryClient, QueryClientProvider } from 'react-query';

import Extractor from './components/Extractor';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Extractor />
    </QueryClientProvider>
  );
}

export default App;
