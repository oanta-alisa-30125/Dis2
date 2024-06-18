import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryBar() {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/homescreen?category=${category}`);
    };

  
    const handleViewAllClick = () => {
        navigate('/homescreen');
    };

    return (
        <div className="category-bar">
            <div className="container">
                <ul className="nav">
                    <li className="nav-item nav-link" onClick={() => handleCategoryClick('Electrocasnice')}>Electronice</li>
                    <li className="nav-item nav-link" onClick={() => handleCategoryClick('Telefon')}>Telefoane</li>
                    <li className="nav-item nav-link" onClick={() => handleCategoryClick('Tableta smart')}>Tablete</li>
                    <li className="nav-item nav-link" onClick={() => handleCategoryClick('Casti')}>Casti</li>
                    <li className="nav-item nav-link" onClick={() => handleCategoryClick('Articole vestimentare')}>Articole vestimentare</li>
                    <li className="nav-item nav-link" onClick={handleViewAllClick}>Vezi toate produsele</li>
          
                   
                    {/* <li className="nav-item" onClick={() => handleCategoryClick('finantare')}>Finantare</li>
                    <li className="nav-item" onClick={() => handleCategoryClick('suport')}>Suport clienti</li>
                    <li className="nav-item" onClick={() => handleCategoryClick('magazine')}>Magazine</li> */}
                </ul>
            </div>
        </div>
    );
}