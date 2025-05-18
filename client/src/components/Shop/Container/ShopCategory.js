import ItemCard from "../../Card/ItemCard/ItemCard";
import './ShopCategory.css'

const ShopCategory = ({ name, description, items, category }) => {
    return (
        <section className="category-section">
            <div className="category-header">
                <h2 className="category-title">{name}</h2>
                {description && (
                    <p className="category-description">{description}</p>
                )}
            </div>
            
            <div className="category-grid">
                {items.map((item) => (
                    <ItemCard 
                        key={item._id} 
                        item={item} 
                        category={category}
                    />
                ))}
            </div>
        </section>
    );
}

export default ShopCategory;