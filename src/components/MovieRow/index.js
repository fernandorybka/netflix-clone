import React, {useState} from 'react';
import './MovieRow.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default ({title, items}) => {

    const [scrollHorizontal,setScrollHorizontal] = React.useState(0);

    const handleLeftArrow = () => {
        let margin = scrollHorizontal + Math.round(window.innerWidth/2);
        setScrollHorizontal((margin) > 0 ? 0 : margin);
    }
    
    const handleRightArrow = () => {
        let margin = scrollHorizontal - Math.round(window.innerWidth/2);
        let maxMargin = window.innerWidth - (items.results.length * 150) - 60;

        setScrollHorizontal(margin < maxMargin ? maxMargin : margin);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--arrowLeft" onClick={handleLeftArrow}><ArrowBackIosIcon style={{fontSize: 50}} /></div>
            <div className="movieRow--arrowRight" onClick={handleRightArrow}><ArrowForwardIosIcon style={{fontSize: 50}} /></div>


            <div className="movieRow--listArea">
                <div className="movieRow--list" style={{
                        marginLeft: scrollHorizontal,
                        width: items.results.length * 150
                    }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                            <div key={key} className="movieRow--item">
                                { item.poster_path ?
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} title={item.original_title}/>
                                :
                                <img src={`https://via.placeholder.com/300x450.png/222222/ffffff?text=imagem+nao+encontrada`} alt={item.original_title} title={item.original_title}/>
                                }
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
}