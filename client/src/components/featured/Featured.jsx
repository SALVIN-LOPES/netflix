import { Button } from '@material-ui/core';
import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import axios from "axios";
import { useEffect,useState } from 'react';
import './featured.scss';

function Featured({type}){
    const [content,setContent] = useState({});

    useEffect(() =>{
        const getRandomContent = async () =>{
            try{
                const res = await axios.get(`/movies/random?type=${type}`,
                {
                    headers : {
                        token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTdjNDcwMmRlOGQwODhjNDJhYzdmYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTg2MDEzOCwiZXhwIjoxNjQ2MjkyMTM4fQ.KGFcchhQleLffrDokhoh_3vi1B1Gki5K0ISeQ1A_tW0"
                    }
                })
                console.log(res.data);
                setContent(res.data[0])
            }catch(err){
                console.log("ERR=",err);
            }
        }
        getRandomContent();
    },[type])

    return (
        <div className='featured'>
            {type && (
                <div className="category">
                    <span>{type === 'movies' ? "Movies" : "Series" }</span>
                    <select name="genre" id="genre">
                        <option value="">Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>


                    </select>
                </div>
            )} 
            <img
                src={content.img}
                alt=""
            />
            <div className="info">
                <img
                    src={content.imgTitle}
                    alt=""
                />
                <span className='desc'>{content.desc}</span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow/>
                        <span>play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined/>
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured;

