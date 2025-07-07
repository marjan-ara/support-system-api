import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout';
import ContactList from './pages/contacts/ContactList';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: twentyFourHoursInMs,
      cacheTime: 360000,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<div />}></Route>
            <Route path="/contacts" element={<ContactList />} />
          </Routes>
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
