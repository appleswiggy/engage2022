function Search({ search, setSearch }) {
  return (
    <div className="form__body">
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          placeholder="Search..."
        />
        <label className="form__label">Search</label>
      </div>
    </div>
  );
}

export default Search;
