import { v4 as uuidv4 } from 'uuid';

export function addSearchTermToLocalStorage(
  searchTerm: string,
  userId: string
) {
  console.log(`Adding "${searchTerm}" to local storage for user ${userId}`);
  const storageKey = `recentSearches_${userId}`;
  const recentSearches = JSON.parse(localStorage.getItem(storageKey) || '[]');
  console.log(`Recent searches for user ${userId}:`, recentSearches);
  recentSearches.push(searchTerm);
  localStorage.setItem(storageKey, JSON.stringify(recentSearches));
  console.log(`Updated recent searches for user ${userId}:`, recentSearches);
}

export function getRecentSearchesFromLocalStorage(): string[] {
  const userId = uuidv4();
  const storageKey = `recentSearches_${userId}`;
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}
