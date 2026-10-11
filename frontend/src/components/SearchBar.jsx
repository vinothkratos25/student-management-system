function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search by name, email or course..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchBar