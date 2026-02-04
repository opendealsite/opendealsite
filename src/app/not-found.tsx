import React from 'react';
import { ErrorLayout } from '@/components/ErrorLayout';
import { api } from '@/lib/api';

export default async function NotFound() {
  const country = 'us'; // Default fallback for global 404
  let deals = [];
  
  try {
    // Server-side fetch
    deals = await api.getHotDeals(24, 0, 20, country);
  } catch (err) {
    console.error("Failed to fetch hot deals for 404 page", err);
  }

  return (
    <ErrorLayout
      country={country}
      title="Page Not Found"
      message="Sorry, we couldn't find the page you're looking for. Check out these hot deals instead!"
      deals={deals}
    />
  );
}
