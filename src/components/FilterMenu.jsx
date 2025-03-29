import { useState } from "react";

const FilterMenu = ({ setFilter }) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск по имени..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setFilter(search)}>Применить</button>
    </div>
  );
};

export default FilterMenu;
