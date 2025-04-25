// frontend/pages/_app.js
import '../styles/globals.css';
import { RoleProvider } from '../contexts/RoleContext';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <RoleProvider>
      <Navbar />
      <Component {...pageProps} />
    </RoleProvider>
  );
}

export default MyApp;