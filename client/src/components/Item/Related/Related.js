import { useState, useEffect } from 'react';
import axios from 'axios'; 
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const Related = (props) => {
    
    const [ menItems, setMenItems ] = useState()
    const [ nylonItems, setnylonItems ] = useState()
    const [ kidsItems, setKidsItems ] = useState()

    useEffect(() => {
        axios.get("https://Shema-backend.vercel.app/api/items")
            .then(res => {
                setMenItems(res.data.filter((item) => item.category === "men"))
                setKidsItems(res.data.filter((item) => item.category === "kids" ))
                setnylonItems(res.data.filter((item) => item.category === "nylon"))
            })
            .catch(err => console.log(err))
    }, [])
    
    return ( 
            <div className="related__products">
                <div className="related__header__container">
                    <div className="related__header">
                        <h2>Recommended Products</h2>
                    </div>
                    <div className="related__header__line">
                            
                    </div>
                </div>
                <div className="related__card__container">
                    <div className="related__product__card">
                        { menItems && props.category === "men" && menItems.map((item) => <RelatedCard item={item}/>)}
                        { nylonItems && props.category === "nylon" && nylonItems.map((item) => <RelatedCard item={item}/>)}
                        { kidsItems && props.category === "kids" && kidsItems.map((item) => <RelatedCard item={item}/>)}
                        
                    </div>
                </div>
            </div>
     );
}
 
export default Related;