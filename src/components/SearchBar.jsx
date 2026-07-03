import "../styles/components/SearchBar.css";

const SearchBar = (props) => {
    const {
        searchText = '',
        onSearchText
    } = props;
    return (
        <input
            className="search-input"
            type="text"
            placeholder="Поиск задачи..."

            value={searchText}
            onChange={(event) => onSearchText(event.target.value)}
        />
    );
};

export default SearchBar;