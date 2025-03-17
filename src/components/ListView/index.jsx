import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchData} from '../../store/features/blogs/blogsSlice';
import {useNavigate} from 'react-router-dom';
import {debounce} from '../../utils/debounce';
import './style.css';

const ListView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.data.items);
  const status = useSelector((state) => state.data.status);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by title..."
        onChange={handleSearchChange}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item.id)}>
            <span className="icon">📄</span>
            <span className="title">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
