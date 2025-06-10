import "../styles/globals.scss";
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Layout } from '../components';

export default function App({ Component, pageProps }) {
  return (
  <Layout>
    <Component {...pageProps} />;

  </Layout>
  )
}

