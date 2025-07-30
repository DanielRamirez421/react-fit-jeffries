import { useEffect, useState } from "react";

export const useFetchBooks = (bookName) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let isBookNameEmpty = true;

  useEffect(() => {
    isBookNameEmpty = !bookName;
  }, [bookName]);

  useEffect(() => {
    const getBooks = async () => {
      if (!bookName) {
        setBooks([]);
        return;
      }

      setIsLoading(!isBookNameEmpty);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${bookName}`
        );
        const { docs } = await res.json();
        setBooks(isBookNameEmpty ? [] : docs);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    getBooks();
  }, [bookName]);

  return { books, isLoading };
};
