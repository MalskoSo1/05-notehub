import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (x: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      placeholder="Search notes"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
