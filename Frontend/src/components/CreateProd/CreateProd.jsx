import axios from 'axios';
import { useRecoilState, useSetRecoilState } from "recoil";
import { ProdList, currProdID, editCheck, currProdName, currProdCode, currDesc, currReleasedate, currPrice, currRating, currImageurl, notification } from "../../Atoms/ProdsStore";
import './CreateProd.css';

export function CreateProd() {
    const [currProdNameV, setCurrProdName] = useRecoilState(currProdName);
    const [currDescV, setCurrDesc] = useRecoilState(currDesc);
    const [currReleasedateV, setCurrReleasedate] = useRecoilState(currReleasedate);
    const [currPriceV, setCurrPrice] = useRecoilState(currPrice);
    const [currRatingV, setCurrRating] = useRecoilState(currRating);
    const [currImageurlV, setCurrImageurl] = useRecoilState(currImageurl);
    const [currProdCodeV, setCurrProdCode] = useRecoilState(currProdCode);
    const [currProdIDV, setcurrProdID] = useRecoilState(currProdID);
    const [editCheckV, seteditCheck] = useRecoilState(editCheck);
    const setProdLst = useSetRecoilState(ProdList);
    const [Notification, setNotification] = useRecoilState(notification);

    const handleEditClick = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getProd/${currProdIDV}`);
            if (response.status === 200) {
                const product = response.data.data;
                setCurrProdName(product.productname);
                setCurrProdCode(product.productcode);
                setCurrDesc(product.description);
                setCurrReleasedate(product.releasedate);
                setCurrPrice(product.price);
                setCurrRating(product.rating);
                setCurrImageurl(product.imageurl);
                seteditCheck(true);
            }
        } catch (error) {
            console.error('Error fetching product:', error.response ? error.response.data : error.message);
        }
    };

    const handletoClick = async () => {
        const data = {
            "productid": currProdIDV,
            "productname": currProdNameV,
            "productcode": currProdCodeV,
            "description": currDescV,
            "releasedate": currReleasedateV,
            "price": currPriceV,
            "rating": currRatingV,
            "imageurl": currImageurlV
        };

        try {
            const response = editCheckV ? await axios.put('http://localhost:3000/UpdateProd', data) : await axios.post('http://localhost:3000/CreateProd', data);
            if (response.status === 200) {
                setNotification(editCheckV ? `Product with ${currProdIDV} updated!` : `Product with ${currProdNameV} created!`);
                setTimeout(() => {
                    setNotification("");
                }, 2000);
                setProdLst(response.data.data);

            }
        } catch (error) {
            console.error('Error saving product:', error.response ? error.response.data : error.message);
        }
        // Reset form fields and edit check state
        resetForm();
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'productid':
                setcurrProdID(value);
                break;
            case 'productname':
                setCurrProdName(value);
                break;
            case 'productcode':
                setCurrProdCode(value);
                break;
            case 'description':
                setCurrDesc(value);
                break;
            case 'releasedate':
                setCurrReleasedate(value);
                break;
            case 'price':
                setCurrPrice(value);
                break;
            case 'rating':
                setCurrRating(value);
                break;
            case 'imageurl':
                setCurrImageurl(value);
                break;
            default:
                break;
        }
    };

    const resetForm = () => {
        setcurrProdID('');
        setCurrProdName('');
        setCurrProdCode('');
        setCurrDesc('');
        setCurrReleasedate('');
        setCurrPrice('');
        setCurrRating('');
        setCurrImageurl('');
        seteditCheck(false);
    };

    return (
        <div className="CreateProd">
            <div className='NotiDiv'>{Notification && <div className="notification">{Notification}</div>}</div>
            <span className='spanLabels'>Product ID</span>
            <input onChange={handleChange} type="text" className='textBoxID' value={currProdIDV} id="productid" placeholder="Product ID" />
            <button onClick={handleEditClick} className="editProdButton" type="button">Edit Product</button> <br />
            <span className='spanLabels'>Product Name</span>
            <input onChange={handleChange} type="text" className='textBox' value={currProdNameV} id="productname" placeholder="Product Name" /> <br />
            <span className='spanLabels'>Product Code</span>
            <input onChange={handleChange} type="text" className='textBox' value={currProdCodeV} id="productcode" placeholder="Product Code" /> <br />
            <span className='spanLabels'>Description</span>
            <input onChange={handleChange} type="text" className='textBox' value={currDescV} id="description" placeholder="Description" /> <br />
            <span className='spanLabels'>Release Date</span>
            <input onChange={handleChange} type="date" className='textBox' value={currReleasedateV} id="releasedate" /> <br />
            <span className='spanLabels'>Price</span>
            <input onChange={handleChange} type="text" id="price" value={currPriceV} className='textBox' placeholder="Price" /> <br />
            <span className='spanLabels'>Rating</span>
            <input onChange={handleChange} type="text" id="rating" value={currRatingV} className='textBox' placeholder="Rating" /> <br />
            <span className='spanLabels'>Image URL</span>
            <input onChange={handleChange} type="text" id="imageurl" value={currImageurlV} className='textBox' placeholder="Image URL" /> <br />
            <button onClick={handletoClick} className="AddProdButton" type="button">{editCheckV ? "Save" : "Add Product"}</button>
        </div>
    );
}
