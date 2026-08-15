import "./SearchBar.css";
function SearchBar({ searchTerm, onSearch, selectedRegion, onRegionChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search destinations..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
      />

      <select
        value={selectedRegion}
        onChange={(event) => onRegionChange(event.target.value)}
      >
        <option value="All">All regions</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="North America">North America</option>
      </select>
    </div>
  );
}

export default SearchBar;