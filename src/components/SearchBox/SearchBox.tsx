import css from "./SearchBox.module.css"
interface SearchBoxProps {
    onSearch: (query: string) => void;  
}
export const SearchBox = ({ onSearch }: SearchBoxProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            onChange={handleChange}
        />
    )
}                  