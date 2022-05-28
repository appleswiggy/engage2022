function Search({ search, setSearch }) {
  return (
    <div class="form__body">
      <div class="form__group field">
        <input
          type="input"
          class="form__field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          placeholder="Search..."
        />
        <label for="search" class="form__label">Search</label>
      </div>
    </div>
  );
}

export default Search;
