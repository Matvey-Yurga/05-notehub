import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import { SearchBox } from '../SearchBox/SearchBox';
import { Loading } from '../isLoading/isLoading';
import { ErrorMessage } from '../errorMessage/errorMessage';
export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => { setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); }; 
    const [page, setPage] = useState(1);
    const [inputVailue, setInputeValue] = useState("");
    const updateSerchQuery = useDebouncedCallback(
        (query: string) => {
            setInputeValue(query);
            setPage(1);
        },
        300
    );
   const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, inputVailue ],
       queryFn: () => fetchNotes(page, inputVailue),
      placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
    return(<div className={css.app}>
        <header className={css.toolbar}>
            <SearchBox onSearch={updateSerchQuery} />
            { totalPages > 0 &&
                    <Pagination onPageChange={setPage} currentPage={page} totalPages={totalPages} />}
            <button className={css.button} onClick={handleOpenModal}>Create note +</button>
        </header>
        {isLoading && <Loading />}
        {isError && <ErrorMessage />}
        {data && !isLoading && <NoteList notes={data?.notes} />}

        {isModalOpen && (
          <Modal onClose={() => handleCloseModal()}>
            <NoteForm onCloseModal={handleCloseModal} />
          </Modal>
        )}
      </div>
        )
}
