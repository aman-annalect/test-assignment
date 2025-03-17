import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getSinglePost} from '../../store/features/blogs/blogsSlice';
import './style.css';

const ItemDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const singlePost = useSelector((state) => state.data.singlePost);
  const singlePostStatus = useSelector((state) => state.data.singlePostStatus);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  if (singlePostStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (singlePostStatus === 'failed') {
    return <div>Error loading post.</div>;
  }

  if (!singlePost) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="item-details">
      <h2>{singlePost.title}</h2>
      <p>{singlePost.body}</p>
    </div>
  );
};

export default ItemDetails;
