import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 700);

  const perPage = 12;

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getNotes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    console.log(error);
  }

  const newSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // useEffect(() => {
  //   setPage(1);
  // }, [debouncedSearch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={newSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
      {isError && <ErrorMessage />}
      {!isError && isLoading && <Loader />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </div>
  );
}
