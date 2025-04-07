export function saveToLocalStorage(name: string) {
  if (typeof window === "undefined") return;

  const namesArr = getLocalStorage();  
  if (!namesArr.includes(name)) {
    namesArr.push(name);
  }

  localStorage.setItem("pokemonFavorites", JSON.stringify(namesArr));
}

export function getLocalStorage(): string[] {
  if (typeof window === "undefined") return [];

  const localStorageData = localStorage.getItem("pokemonFavorites");  
  return localStorageData ? JSON.parse(localStorageData) : [];
}

export function removeFromLocalStorage(name: string) {
  if (typeof window === "undefined") return;

  const namesArr = getLocalStorage();  
  const index = namesArr.indexOf(name);  
  if (index !== -1) {
    namesArr.splice(index, 1);
    localStorage.setItem("pokemonFavorites", JSON.stringify(namesArr));
  }
}
