// import React, { useState, useEffect } from 'react';
// import { GoComment, GoHeart, GoHeartFill, GoTrash, GoPencil, GoCheckCircle } from "react-icons/go";
// import './library.scss';
// import ImageK from '../../images/Dippers.jpg';
//
// const mockConstellations = [
//     {
//         id: 1,
//         name: "Orion",
//         imageUrl: ImageK,
//         description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 2,
//         name: "Большая медведица",
//         imageUrl: ImageK,
//         description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//         comments: [],
//     },
//     {
//         id: 3,
//         name: "Cassiopeia",
//         imageUrl: ImageK,
//         description: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
//         comments: [],
//     },
// ];
//
// const Library = () => {
//     const [constellations, setConstellations] = useState([]);
//     const [selectedConstellationIndex, setSelectedConstellationIndex] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [favorites, setFavorites] = useState([]);
//     const [showComments, setShowComments] = useState(false);
//     const [comment, setComment] = useState('');
//     const [editingCommentId, setEditingCommentId] = useState(null);
//     const [editingText, setEditingText] = useState('');
//
//     useEffect(() => {
//         setConstellations(mockConstellations);
//     }, []);
//
//     const filteredConstellations = constellations.filter(constellation =>
//         constellation.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     const selectedConstellation = selectedConstellationIndex !== null ? filteredConstellations[selectedConstellationIndex] : null;
//
//     const handleConstellationSelect = (index) => {
//         setSelectedConstellationIndex(index);
//         setShowComments(false);
//     };
//
//     const handleAddToFavorites = () => {
//         if (selectedConstellation && !favorites.includes(selectedConstellation.id)) {
//             setFavorites([...favorites, selectedConstellation.id]);
//         }
//     };
//
//     const handleToggleComments = () => {
//         setShowComments(!showComments);
//     };
//
//     const handleAddComment = () => {
//         if (selectedConstellation) {
//             const newComment = {
//                 id: Date.now(),
//                 text: comment,
//                 author: {
//                     name: 'User' // замените на реальное имя пользователя
//                 }
//             };
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: [...constellation.comments, newComment],
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//             setComment('');
//         }
//     };
//
//     const handleDeleteComment = (commentId) => {
//         if (selectedConstellation) {
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: constellation.comments.filter(comment => comment.id !== commentId),
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//         }
//     };
//
//     const handleEditComment = (commentId) => {
//         setEditingCommentId(commentId);
//         const commentToEdit = selectedConstellation.comments.find(comment => comment.id === commentId);
//         setEditingText(commentToEdit.text);
//     };
//
//     const handleSaveComment = () => {
//         if (selectedConstellation) {
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: constellation.comments.map(comment =>
//                                 comment.id === editingCommentId ? { ...comment, text: editingText } : comment
//                             ),
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//             setEditingCommentId(null);
//             setEditingText('');
//         }
//     };
//
//     return (
//         <div className="content-wrapper">
//             <section className="home destinations">
//                 <div className="container">
//                     <div className="header-section">
//                         <h2 className="title">
//                             01
//                             <span className="subtitle">Библиотека созвездий</span>
//                         </h2>
//                         <div className="search-bar">
//                             <input
//                                 type="text"
//                                 placeholder="Введите название созвездия:"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </div>
//                         <p className="list">Список созвездий:</p>
//                         <ul className="constellations-list">
//                             {filteredConstellations.map((item, index) => (
//                                 <li key={item.id}>
//                                     <button
//                                         onClick={() => handleConstellationSelect(index)}
//                                         className={`constellation-button ${index === selectedConstellationIndex ? 'active' : ''}`}
//                                     >
//                                         {item.name}
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     {selectedConstellation && (
//                         <article className="details-section">
//                             <h2 className="constellation-name">{selectedConstellation.name}</h2>
//                             <img
//                                 src={selectedConstellation.imageUrl}
//                                 alt={selectedConstellation.name}
//                                 title={selectedConstellation.name}
//                                 className="constellation-image"
//                             />
//                             <p className="constellation-description">{selectedConstellation.description}</p>
//                             <div className="actions">
//                                 <button className="favorite-button" onClick={handleAddToFavorites}>
//                                     {favorites.includes(selectedConstellation.id) ? (
//                                         <GoHeartFill className="icon filled" />
//                                     ) : (
//                                         <GoHeart className="icon" />
//                                     )}
//                                 </button>
//                                 <button className="comments-button" onClick={handleToggleComments}>
//                                     <GoComment className="icon"/>
//                                 </button>
//                             </div>
//                             {showComments && (
//                                 <div className="comments-section">
//                                     <h3>Комментарии</h3>
//                                     {selectedConstellation.comments.map((comment) => (
//                                         <div key={comment.id} className="comment-item">
//                                             <div className="comment-content">
//                                                 <span className="author-name">{comment.author.name}</span>
//                                                 {editingCommentId === comment.id ? (
//                                                     <div className="edit-comment">
//                                                         <input
//                                                             type="text"
//                                                             value={editingText}
//                                                             onChange={(e) => setEditingText(e.target.value)}
//                                                         />
//                                                         <GoCheckCircle className="icon save-icon" onClick={handleSaveComment} />
//                                                     </div>
//                                                 ) : (
//                                                     <p>{comment.text}</p>
//                                                 )}
//                                                 <div className="comment-actions">
//                                                     <GoPencil className="icon" onClick={() => handleEditComment(comment.id)} />
//                                                     <GoTrash className="icon" onClick={() => handleDeleteComment(comment.id)} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     <input
//                                         type="text"
//                                         value={comment}
//                                         onChange={(e) => setComment(e.target.value)}
//                                         placeholder="Добавить комментарий"
//                                     />
//                                     <button onClick={handleAddComment}>Отправить</button>
//                                 </div>
//                             )}
//                         </article>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// };
//
// export default Library;
//




//
// import React, { useState, useEffect } from 'react';
// import { GoComment, GoHeart, GoHeartFill, GoTrash, GoPencil, GoCheckCircle } from "react-icons/go";
// import './library.scss';
// import ImageK from '../../images/Dippers.jpg';
// import ConstellationList from '../../components/Library/ConstellationList.jsx';
//
// const mockConstellations = [
//     {
//         id: 1,
//         name: "Orion",
//         imageUrl: ImageK,
//         description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 2,
//         name: "Большая медведица",
//         imageUrl: ImageK,
//         description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//         comments: [],
//     },
//     {
//         id: 3,
//         name: "Cassiopeia",
//         imageUrl: ImageK,
//         description: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 4,
//         name: "Orion",
//         imageUrl: ImageK,
//         description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 5,
//         name: "Большая медведица",
//         imageUrl: ImageK,
//         description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//         comments: [],
//     },
//     {
//         id: 6,
//         name: "Cassiopeia",
//         imageUrl: ImageK,
//         description: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 7,
//         name: "Orion",
//         imageUrl: ImageK,
//         description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 8,
//         name: "Большая медведица",
//         imageUrl: ImageK,
//         description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//         comments: [],
//     },
//     {
//         id: 9,
//         name: "Cassiopeia",
//         imageUrl: ImageK,
//         description: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 10,
//         name: "Orion",
//         imageUrl: ImageK,
//         description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 11,
//         name: "Большая медведица",
//         imageUrl: ImageK,
//         description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//         comments: [],
//     },
//     {
//         id: 12,
//         name: "Cassiopeia",
//         imageUrl: ImageK,
//         description: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 13,
//         name: "Orion",
//         imageUrl: ImageK,
//         description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 14,
//         name: "Большая медведица",
//         imageUrl: ImageK,
//         description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//         comments: [],
//     },
//     {
//         id: 15,
//         name: "Cassiopeia",
//         imageUrl: ImageK,
//         description: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 16,
//         name: "Orion",
//         imageUrl: ImageK,
//         description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//         comments: [],
//     },
//     {
//         id: 17,
//         name: "Большая медведица",
//         imageUrl: ImageK,
//         description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//         comments: [],
//     },
// ];
//
// const Library = () => {
//     const [constellations, setConstellations] = useState([]);
//     const [selectedConstellationIndex, setSelectedConstellationIndex] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [favorites, setFavorites] = useState([]);
//     const [showComments, setShowComments] = useState(false);
//     const [comment, setComment] = useState('');
//     const [editingCommentId, setEditingCommentId] = useState(null);
//     const [editingText, setEditingText] = useState('');
//
//     useEffect(() => {
//         setConstellations(mockConstellations);
//     }, []);
//
//     const filteredConstellations = constellations.filter(constellation =>
//         constellation.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     const selectedConstellation = selectedConstellationIndex !== null ? filteredConstellations[selectedConstellationIndex] : null;
//
//     const handleConstellationSelect = (index) => {
//         setSelectedConstellationIndex(index);
//         setShowComments(false);
//     };
//
//     const handleAddToFavorites = () => {
//         if (selectedConstellation && !favorites.includes(selectedConstellation.id)) {
//             setFavorites([...favorites, selectedConstellation.id]);
//         }
//     };
//
//     const handleToggleComments = () => {
//         setShowComments(!showComments);
//     };
//
//     const handleAddComment = () => {
//         if (selectedConstellation) {
//             const newComment = {
//                 id: Date.now(),
//                 text: comment,
//                 author: {
//                     name: 'User' // замените на реальное имя пользователя
//                 }
//             };
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: [...constellation.comments, newComment],
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//             setComment('');
//         }
//     };
//
//     const handleDeleteComment = (commentId) => {
//         if (selectedConstellation) {
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: constellation.comments.filter(comment => comment.id !== commentId),
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//         }
//     };
//
//     const handleEditComment = (commentId) => {
//         setEditingCommentId(commentId);
//         const commentToEdit = selectedConstellation.comments.find(comment => comment.id === commentId);
//         setEditingText(commentToEdit.text);
//     };
//
//     const handleSaveComment = () => {
//         if (selectedConstellation) {
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: constellation.comments.map(comment =>
//                                 comment.id === editingCommentId ? { ...comment, text: editingText } : comment
//                             ),
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//             setEditingCommentId(null);
//             setEditingText('');
//         }
//     };
//
//     return (
//         <div className="content-wrapper">
//             <section className="home destinations">
//                 <div className="container">
//                     <div className="header-section">
//                         <h2 className="title">
//                             01
//                             <span className="subtitle">Библиотека созвездий</span>
//                         </h2>
//                         <div className="search-bar">
//                             <input
//                                 type="text"
//                                 placeholder="Введите название созвездия:"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </div>
//                         <p className="list">Список созвездий:</p>
//                         <div className="constellation-list-wrapper">
//                             <ConstellationList
//                                 constellations={filteredConstellations}
//                                 selectedConstellationIndex={selectedConstellationIndex}
//                                 handleConstellationSelect={handleConstellationSelect}
//                             />
//                         </div>
//                     </div>
//                     {selectedConstellation && (
//                         <article className="details-section">
//                             <h2 className="constellation-name">{selectedConstellation.name}</h2>
//                             <img
//                                 src={selectedConstellation.imageUrl}
//                                 alt={selectedConstellation.name}
//                                 title={selectedConstellation.name}
//                                 className="constellation-image"
//                             />
//                             <p className="constellation-description">{selectedConstellation.description}</p>
//                             <div className="actions">
//                                 <button className="favorite-button"
//                                         onClick={handleAddToFavorites}
//                                 >
//                                     {favorites.includes(selectedConstellation.id) ? (
//                                         <GoHeartFill className="icon filled" />
//                                     ) : (
//                                         <GoHeart className="icon" />
//                                     )}
//                                 </button>
//                                 <button className="comments-button" onClick={handleToggleComments}>
//                                     <GoComment className="icon"/>
//                                 </button>
//                             </div>
//                             {showComments && (
//                                 <div className="comments-section">
//                                     <h3>Комментарии</h3>
//                                     {selectedConstellation.comments.map((comment) => (
//                                         <div key={comment.id} className="comment-item">
//                                             <div className="comment-content">
//                                                 <span className="author-name">{comment.author.name}</span>
//                                                 {editingCommentId === comment.id ? (
//                                                     <div className="edit-comment">
//                                                         <input
//                                                             type="text"
//                                                             value={editingText}
//                                                             onChange={(e) => setEditingText(e.target.value)}
//                                                         />
//                                                         <GoCheckCircle className="icon save-icon" onClick={handleSaveComment} />
//                                                     </div>
//                                                 ) : (
//                                                     <p>{comment.text}</p>
//                                                 )}
//                                                 <div className="comment-actions">
//                                                     <GoPencil className="icon" onClick={() => handleEditComment(comment.id)} />
//                                                     <GoTrash className="icon" onClick={() => handleDeleteComment(comment.id)} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     <input
//                                         type="text"
//                                         value={comment}
//                                         onChange={(e) => setComment(e.target.value)}
//                                         placeholder="Добавить комментарий"
//                                     />
//                                     <button onClick={handleAddComment}>Отправить</button>
//                                 </div>
//                             )}
//                         </article>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// };
//
// export default Library;





// import React, { useState, useEffect } from 'react';
// import { GoComment, GoHeart, GoHeartFill, GoTrash, GoPencil, GoCheckCircle } from "react-icons/go";
// import './library.scss';
// import ImageK from '../../images/Dippers.jpg';
// import ConstellationList from '../../components/Library/ConstellationList.jsx';
//
// const mockConstellations = [
//     {
//          id: 1,
//          name: "Orion",
//          imageUrl: ImageK,
//          description: "Orion is one of the most prominent constellations visible in the night sky. It is named after Orion, a hunter in Greek mythology.",
//          comments: [],
//      },
//      {
//          id: 2,
//          name: "Большая медведица",
//          imageUrl: ImageK,
//          description: "Ursa Major is a constellation in the northern sky, whose associated mythology likely dates back into prehistory.",
//          comments: [],
//      },
// ];
//
// const Library = () => {
//     const [constellations, setConstellations] = useState([]);
//     const [selectedConstellationIndex, setSelectedConstellationIndex] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [favorites, setFavorites] = useState([]);
//     const [showComments, setShowComments] = useState(false);
//     const [comment, setComment] = useState('');
//     const [editingCommentId, setEditingCommentId] = useState(null);
//     const [editingText, setEditingText] = useState('');
//
//     useEffect(() => {
//         setConstellations(mockConstellations);
//     }, []);
//
//     const filteredConstellations = constellations.filter(constellation =>
//         constellation.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     const selectedConstellation = selectedConstellationIndex !== null ? filteredConstellations[selectedConstellationIndex] : null;
//
//     const handleConstellationSelect = (index) => {
//         setSelectedConstellationIndex(index);
//         setShowComments(false);
//     };
//
//     const handleAddToFavorites = () => {
//         if (selectedConstellation) {
//             if (favorites.includes(selectedConstellation.id)) {
//                 // Если созвездие уже в избранных, удаляем его
//                 setFavorites(favorites.filter(id => id !== selectedConstellation.id));
//             } else {
//                 // Если созвездие не в избранных, добавляем его
//                 setFavorites([...favorites, selectedConstellation.id]);
//             }
//         }
//     };
//
//     const handleToggleComments = () => {
//         setShowComments(!showComments);
//     };
//
//     const handleAddComment = () => {
//         if (selectedConstellation) {
//             const newComment = {
//                 id: Date.now(),
//                 text: comment,
//                 author: {
//                     name: 'User' // замените на реальное имя пользователя
//                 }
//             };
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: [...constellation.comments, newComment],
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//             setComment('');
//         }
//     };
//
//     const handleDeleteComment = (commentId) => {
//         if (selectedConstellation) {
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: constellation.comments.filter(comment => comment.id !== commentId),
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//         }
//     };
//
//     const handleEditComment = (commentId) => {
//         setEditingCommentId(commentId);
//         const commentToEdit = selectedConstellation.comments.find(comment => comment.id === commentId);
//         setEditingText(commentToEdit.text);
//     };
//
//     const handleSaveComment = () => {
//         if (selectedConstellation) {
//             setConstellations(prevConstellations => {
//                 return prevConstellations.map(constellation => {
//                     if (constellation.id === selectedConstellation.id) {
//                         return {
//                             ...constellation,
//                             comments: constellation.comments.map(comment =>
//                                 comment.id === editingCommentId ? { ...comment, text: editingText } : comment
//                             ),
//                         };
//                     }
//                     return constellation;
//                 });
//             });
//             setEditingCommentId(null);
//             setEditingText('');
//         }
//     };
//
//     return (
//         <div className="content-wrapper">
//             <section className="home destinations">
//                 <div className="container">
//                     <div className="header-section">
//                         <h2 className="title">
//                             01
//                             <span className="subtitle">Библиотека созвездий</span>
//                         </h2>
//                         <div className="search-bar">
//                             <input
//                                 type="text"
//                                 placeholder="Введите название созвездия:"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </div>
//                         <p className="list">Список созвездий:</p>
//                         <div className="constellation-list-wrapper">
//                             <ConstellationList
//                                 constellations={filteredConstellations}
//                                 selectedConstellationIndex={selectedConstellationIndex}
//                                 handleConstellationSelect={handleConstellationSelect}
//                             />
//                         </div>
//                     </div>
//                     {selectedConstellation && (
//                         <article className={`details-section fade-in`}>
//                             <h2 className="constellation-name">{selectedConstellation.name}</h2>
//                             <img
//                                 src={selectedConstellation.imageUrl}
//                                 alt={selectedConstellation.name}
//                                 title={selectedConstellation.name}
//                                 className="constellation-image"
//                             />
//                             <p className="constellation-description">{selectedConstellation.description}</p>
//                             <div className="actions">
//                                 <button className="favorite-button" onClick={handleAddToFavorites}>
//                                     {favorites.includes(selectedConstellation.id) ? (
//                                         <GoHeartFill className="icon filled" />
//                                     ) : (
//                                         <GoHeart className="icon" />
//                                     )}
//                                 </button>
//                                 <button className="comments-button" onClick={handleToggleComments}>
//                                     <GoComment className="icon" />
//                                 </button>
//                             </div>
//                             {showComments && (
//                                 <div className="comments-section">
//                                     <h3>Комментарии</h3>
//                                     {selectedConstellation.comments.map((comment) => (
//                                         <div key={comment.id} className="comment-item">
//                                             <div className="comment-content">
//                                                 <span className="author-name">{comment.author.name}</span>
//                                                 {editingCommentId === comment.id ? (
//                                                     <div className="edit-comment">
//                                                         <input
//                                                             type="text"
//                                                             value={editingText}
//                                                             onChange={(e) => setEditingText(e.target.value)}
//                                                         />
//                                                         <GoCheckCircle className="icon save-icon" onClick={handleSaveComment} />
//                                                     </div>
//                                                 ) : (
//                                                     <p>{comment.text}</p>
//                                                 )}
//                                                 <div className="comment-actions">
//                                                     <GoPencil className="icon" onClick={() => handleEditComment(comment.id)} />
//                                                     <GoTrash className="icon" onClick={() => handleDeleteComment(comment.id)} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     <input
//                                         type="text"
//                                         value={comment}
//                                         onChange={(e) => setComment(e.target.value)}
//                                         placeholder="Добавить комментарий"
//                                     />
//                                     <button onClick={handleAddComment}>Отправить</button>
//                                 </div>
//                             )}
//                         </article>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// };
//
// export default Library;
//





import { useState, useEffect } from 'react';
import { GoComment, GoHeart, GoHeartFill, GoTrash } from "react-icons/go";
import ArticlesService from '../../api/ArticlesService';
import './library.scss';
import ConstellationList from '../../components/Library/ConstellationList';
import { useUserContext } from '../../api/UserContext';

const Library = () => {
    const { user } = useUserContext();
    const [articles, setArticles] = useState([]);
    const [selectedArticleIndex, setSelectedArticleIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        ArticlesService.getArticles()
            .then(data => {
                console.log('Data received:', data);
                setArticles(data);
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }, []);

    const filteredArticles = articles.filter(article =>
        article.title && article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log('Filtered Articles:', filteredArticles);

    const selectedArticle = selectedArticleIndex !== null ? filteredArticles[selectedArticleIndex] : null;

    const handleArticleSelect = (index) => {
        setSelectedArticleIndex(index);
        setShowComments(false);
    };

    const handleAddToFavorites = () => {
        if (selectedArticle) {
            if (favorites.includes(selectedArticle.id)) {
                ArticlesService.deleteFavorite(selectedArticle.id)
                    .then(() => {
                        setFavorites(favorites.filter(id => id !== selectedArticle.id));
                    })
                    .catch(error => console.error('Ошибка при удалении из избранного:', error));
            } else {
                ArticlesService.addFavorite(selectedArticle.id)
                    .then(() => {
                        setFavorites([...favorites, selectedArticle.id]);
                    })
                    .catch(error => console.error('Ошибка при добавлении в избранное:', error));
            }
        }
    };

    const handleToggleComments = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = () => {
        if (selectedArticle && user) {
            const newComment = {
                text: comment,
                article_id: selectedArticle.id
            };
            ArticlesService.addComment(newComment)
                .then(responseData => {
                    setArticles(prevArticles => {
                        return prevArticles.map(article => {
                            if (article.id === selectedArticle.id) {
                                return {
                                    ...article,
                                    comments: [...article.comments, responseData],
                                };
                            }
                            return article;
                        });
                    });
                    setComment('');
                })
                .catch(error => console.error('Ошибка при добавлении комментария:', error));
        }
    };

    const handleDeleteComment = (commentId) => {
        if (selectedArticle) {
            ArticlesService.deleteComment(commentId)
                .then(() => {
                    setArticles(prevArticles => {
                        return prevArticles.map(article => {
                            if (article.id === selectedArticle.id) {
                                return {
                                    ...article,
                                    comments: article.comments.filter(comment => comment.id !== commentId),
                                };
                            }
                            return article;
                        });
                    });
                })
                .catch(error => console.error('Ошибка при удалении комментария:', error));
        }
    };

    return (
        <div className="content-wrapper">
            <section className="home destinations">
                <div className="container">
                    <div className="header-section">
                        <h2 className="title">
                            01
                            <span className="subtitle">Библиотека статей</span>
                        </h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Введите название статьи:"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <p className="list">Список статей:</p>
                        <div className="article-list-wrapper">
                            <ConstellationList
                                articles={filteredArticles}
                                selectedArticleIndex={selectedArticleIndex}
                                handleArticleSelect={handleArticleSelect}
                            />
                        </div>
                    </div>
                    {selectedArticle && (
                        <article className={`details-section fade-in`}>
                            <h2 className="article-name">{selectedArticle.title}</h2>
                            <img
                                src={selectedArticle.imageUrl}
                                alt={selectedArticle.title}
                                title={selectedArticle.title}
                                className="article-image"
                            />
                            <p className="article-description">{selectedArticle.description}</p>
                            <div className="actions">
                                <button className="favorite-button" onClick={handleAddToFavorites}>
                                    {favorites.includes(selectedArticle.id) ? (
                                        <GoHeartFill className="icon filled" />
                                    ) : (
                                        <GoHeart className="icon" />
                                    )}
                                </button>
                                <button className="comments-button" onClick={handleToggleComments}>
                                    <GoComment className="icon" />
                                </button>
                            </div>
                            {showComments && (
                                <>
                                    <div className="comments-section-wrapper">
                                        <div className="comments-section">
                                            <h3>Комментарии</h3>
                                            {selectedArticle.comments.map((comment) => (
                                                <div key={comment.id} className="comment-item">
                                                    <div className="comment-content">
                                                        <span className="author-name">{comment.author.name}</span>
                                                        <p>{comment.text}</p>
                                                        <div className="comment-actions">
                                                            <GoTrash className="icon" onClick={() => handleDeleteComment(comment.id)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Добавить комментарий"
                                    />
                                    <button onClick={handleAddComment}>Отправить</button>
                                </>
                            )}
                        </article>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Library;



// import { useState, useEffect } from 'react';
// import { GoComment, GoHeart, GoHeartFill, GoTrash } from "react-icons/go";
// import axiosInstance from '../../api/axios';
// import './library.scss';
// import ConstellationList from '../../components/Library/ConstellationList';
// import { useUserContext } from '../../api/UserContext';
//
// const Library = () => {
//     const { user } = useUserContext();
//     const [articles, setArticles] = useState([]);
//     const [selectedArticleIndex, setSelectedArticleIndex] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [favorites, setFavorites] = useState([]);
//     const [showComments, setShowComments] = useState(false);
//     const [comment, setComment] = useState('');
//
//     useEffect(() => {
//         const fetchArticles = async () => {
//             try {
//                 const response = await axiosInstance.get('/articles/');
//                 console.log('Data received:', response.data);
//                 setArticles(response.data);
//             } catch (error) {
//                 console.error('Ошибка при загрузке данных:', error);
//             }
//         };
//
//         fetchArticles();
//     }, []);
//
//     const filteredArticles = articles.filter(article =>
//         article.name && article.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     const selectedArticle = selectedArticleIndex !== null ? filteredArticles[selectedArticleIndex] : null;
//
//     const handleArticleSelect = (index) => {
//         setSelectedArticleIndex(index);
//         setShowComments(false);
//     };
//
//     const handleAddToFavorites = () => {
//         if (selectedArticle) {
//             if (favorites.includes(selectedArticle.id)) {
//                 axiosInstance.delete(`/favorites/${selectedArticle.id}/`)
//                     .then(() => {
//                         setFavorites(favorites.filter(id => id !== selectedArticle.id));
//                     })
//                     .catch(error => console.error('Ошибка при удалении из избранного:', error));
//             } else {
//                 axiosInstance.post('/favorites/', { id: selectedArticle.id })
//                     .then(() => {
//                         setFavorites([...favorites, selectedArticle.id]);
//                     })
//                     .catch(error => console.error('Ошибка при добавлении в избранное:', error));
//             }
//         }
//     };
//
//     const handleToggleComments = () => {
//         setShowComments(!showComments);
//     };
//
//     const handleAddComment = () => {
//         if (selectedArticle && user) {
//             const newComment = {
//                 text: comment,
//                 article_id: selectedArticle.id
//             };
//             axiosInstance.post('/comments/', newComment)
//                 .then(response => {
//                     setArticles(prevArticles => {
//                         return prevArticles.map(article => {
//                             if (article.id === selectedArticle.id) {
//                                 return {
//                                     ...article,
//                                     comments: [...article.comments, response.data],
//                                 };
//                             }
//                             return article;
//                         });
//                     });
//                     setComment('');
//                 })
//                 .catch(error => console.error('Ошибка при добавлении комментария:', error));
//         }
//     };
//
//     const handleDeleteComment = (commentId) => {
//         if (selectedArticle) {
//             axiosInstance.delete(`/comments/${commentId}/`)
//                 .then(() => {
//                     setArticles(prevArticles => {
//                         return prevArticles.map(article => {
//                             if (article.id === selectedArticle.id) {
//                                 return {
//                                     ...article,
//                                     comments: article.comments.filter(comment => comment.id !== commentId),
//                                 };
//                             }
//                             return article;
//                         });
//                     });
//                 })
//                 .catch(error => console.error('Ошибка при удалении комментария:', error));
//         }
//     };
//
//     return (
//         <div className="content-wrapper">
//             <section className="home destinations">
//                 <div className="container">
//                     <div className="header-section">
//                         <h2 className="title">
//                             01
//                             <span className="subtitle">Библиотека статей</span>
//                         </h2>
//                         <div className="search-bar">
//                             <input
//                                 type="text"
//                                 placeholder="Введите название статьи:"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </div>
//                         <p className="list">Список статей:</p>
//                         <div className="article-list-wrapper">
//                             <ConstellationList
//                                 articles={filteredArticles}
//                                 selectedArticleIndex={selectedArticleIndex}
//                                 handleArticleSelect={handleArticleSelect}
//                             />
//                         </div>
//                     </div>
//                     {selectedArticle && (
//                         <article className={`details-section fade-in`}>
//                             <h2 className="article-name">{selectedArticle.name}</h2>
//                             <img
//                                 src={selectedArticle.imageUrl}
//                                 alt={selectedArticle.name}
//                                 title={selectedArticle.name}
//                                 className="article-image"
//                             />
//                             <p className="article-description">{selectedArticle.description}</p>
//                             <div className="actions">
//                                 <button className="favorite-button" onClick={handleAddToFavorites}>
//                                     {favorites.includes(selectedArticle.id) ? (
//                                         <GoHeartFill className="icon filled" />
//                                     ) : (
//                                         <GoHeart className="icon" />
//                                     )}
//                                 </button>
//                                 <button className="comments-button" onClick={handleToggleComments}>
//                                     <GoComment className="icon" />
//                                 </button>
//                             </div>
//                             {showComments && (
//                                 <>
//                                     <div className="comments-section-wrapper">
//                                         <div className="comments-section">
//                                             <h3>Комментарии</h3>
//                                             {selectedArticle.comments.map((comment) => (
//                                                 <div key={comment.id} className="comment-item">
//                                                     <div className="comment-content">
//                                                         <span className="author-name">{comment.author.name}</span>
//                                                         <p>{comment.text}</p>
//                                                         <div className="comment-actions">
//                                                             <GoTrash className="icon" onClick={() => handleDeleteComment(comment.id)} />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         value={comment}
//                                         onChange={(e) => setComment(e.target.value)}
//                                         placeholder="Добавить комментарий"
//                                     />
//                                     <button onClick={handleAddComment}>Отправить</button>
//                                 </>
//                             )}
//                         </article>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// };
//
// export default Library;
