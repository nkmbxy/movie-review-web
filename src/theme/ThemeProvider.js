import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import EmotionCacheProvider from "./EmotionCacheProvider";

const ThemeProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <EmotionCacheProvider options={{ key: "mui" }}>
      {children}
    </EmotionCacheProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
