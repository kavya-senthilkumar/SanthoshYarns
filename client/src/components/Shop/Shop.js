import { useEffect, useState } from 'react';
import { TabTitle } from '../../utils/General';
import axios from "axios";
import ShopCategory from './Container/ShopCategory';
import './Shop.css';
import ReactLoading from 'react-loading';

const Shop = () => {
    TabTitle("SanthoshYarns - Premium Yarn Collection")
    const [cottonItems, setCottonItems] = useState([])
    const [nylonItems, setNylonItems] = useState([])
    const [polyesterItems, setPolyesterItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:5000/api/items")
            .then(res => {
                setCottonItems(res.data.filter((item) => item.category === "cotton"))
                setNylonItems(res.data.filter((item) => item.category === "nylon"))
                setPolyesterItems(res.data.filter((item) => item.category === "polyester"))
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching items:", err)
                setLoading(false)
            })
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="shop-container">
            <div className="shop-content">
                <div className="shop-header">
                    <h1>Our Premium Yarn Collection</h1>
                    <p className="shop-description">
                        Discover our carefully curated selection of high-quality yarns for your creative projects
                    </p>
                </div>
                
                {loading ? (
                    <div className="loading-container">
                        <ReactLoading
                            type="bubbles"
                            color="var(--primary)"
                            height={80}
                            width={80}
                        />
                        <p>Loading our collection...</p>
                    </div>
                ) : (
                    <div className="categories-container">
                        {cottonItems.length > 0 && (
                            <ShopCategory
                                name="Cotton"
                                description="Soft, breathable cotton yarns perfect for everyday wear"
                                items={cottonItems}
                            />
                        )}
                        {nylonItems.length > 0 && (
                            <ShopCategory
                                name="Nylon"
                                description="Durable and versatile nylon yarns for lasting creations"
                                items={nylonItems}
                            />
                        )}
                        {polyesterItems.length > 0 && (
                            <ShopCategory
                                name="Polyester"
                                description="Strong and colorfast polyester yarns for vibrant projects"
                                items={polyesterItems}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;