import { useRecoilState } from 'recoil';
import axios from 'axios';
import { ProdList ,notification} from '../../Atoms/ProdsStore.jsx';
import { useEffect } from 'react';
import "./ProdsList.css";
export function Prods() {
    const [ProdLst, setProdLst] = useRecoilState(ProdList);
    const [Notification, setNotification] = useRecoilState(notification);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/getAllProds");
                console.log(response)
                if (response.status === 200) {
                    setProdLst(response.data.data); // Update Recoil state with fetched data
                    
                } else {
                    console.error('Failed to fetch products:', response.message);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); // Call the fetch function when component mounts
    }, [ProdLst]); 

    return (
        <div className="container">
            {ProdLst.length > 0 ? (
                ProdLst.map((p) => (
                    <Prod 
                        key={p.productid} // Use a unique identifier for the key prop
                        productid={p.productid} 
                        productname={p.productname} 
                        productcode={p.productcode} 
                        releasedate={p.releasedate} 
                        price={p.price} 
                        rating={p.rating} 
                        imageurl={p.imageurl}
                        setProdLst={setProdLst}
                        setNotification={setNotification}
                    />
                ))
            ) : (
                <p className='no-prods-message'>No Products available</p>
            )}
        </div>
    );
}

function Prod({ productid, productname, productcode, releasedate, price, rating ,imageurl,setProdLst,setNotification}) {
    return (
        <div className='prod'>
            <div className='Label'><b>{productid} {productname}</b></div>
            <div className='Label'>Product Code: {productcode}</div>
            <div className='Label'>Release Date: {releasedate}</div>
            <div className='Label'>Price: {price}</div>
            <div className='Label'>Rating: {rating}</div>
            <div className='Label'>Image: <span className='link'>{imageurl}</span> </div >
            <button onClick={async ()=>{
                try {
                    const response = await axios.get(`http://localhost:3000/deleteProd/${productid}`);
                    if (response.status === 200) {
                        setNotification(`Product with ${productid} is deleted`)
                        setTimeout(() => {
                            setNotification("");
                        }, 2000);
                        setProdLst(response.data.data); // Update Recoil state with fetched data
                    } else {
                        console.error('Failed to fetch products:', response.message);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }} className='deleteBtn' type="button">Delete</button>
        </div>
    );
}
