"use client";

interface FavoritesListProps {
  favorites: string[];
  onSelect: (query: string) => void;
  onRemove: (name: string) => void;
}

function FavoritesList({ favorites, onSelect, onRemove }: FavoritesListProps) {
  return (
    <div className="favoritesContainer">
      <div className="favoritesBox p-4 border rounded-md shadow-md">
        <h2 className="text-center font-bold">Favorites</h2>
        {favorites.map((name) => (
          <div key={name} className="flex justify-between items-center my-2">
            <p onClick={() => onSelect(name)} className="cursor-pointer">
              {name}
            </p>
            <button
              onClick={() => onRemove(name)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;

