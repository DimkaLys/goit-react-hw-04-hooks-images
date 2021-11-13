import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Searchbar({
  clearRender,
  onValueSubmit,
  onPageSubmit,
}) {
  const [valueSearch, setValueSearch] = useState('');
  const [pageCurrent, setPageCurrent] = useState(1);

  const handleChange = e => {
    setValueSearch(e.target.value.toLowerCase());
    setPageCurrent(1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (valueSearch.trim() === '') {
      toast.error('Введите корректное название!');
      clearRender();
      return;
    }
    onValueSubmit(valueSearch);
    setValueSearch('');
    onPageSubmit(pageCurrent);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={valueSearch}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
