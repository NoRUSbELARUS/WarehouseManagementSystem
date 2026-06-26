import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductsPage from './pages/ProductsPage';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ProductsPage />
    </QueryClientProvider>
  );
}

export default App;