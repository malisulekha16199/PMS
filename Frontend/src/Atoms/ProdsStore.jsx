import { atom, selector } from 'recoil';
import axios from 'axios';

// Define the atom
const ProdList = atom({
    key: "ProdList",
    default: [], 
});
const currProdID = atom({
    key: "currProdID",
    default: "", 
}); 
const editCheck = atom({
    key: "editCheck",
    default: false 
}); 
const loadingState = atom({
    key: 'loadingState', // Unique ID for the atom
    default: true, // Default value is false (not loading)
});

const currProdName = atom({
    key: "currProdName",
    default: "", 
}); 
const currProdCode = atom({
    key: "currProdCode",
    default: "", 
});
const currDesc = atom({
    key: "currDesc",
    default: "", 
});
const currReleasedate = atom({
    key: "currReleasedate",
    default: "", 
});
const currPrice = atom({
    key: "currPrice",
    default: "", 
});
const currRating = atom({
    key: "currRating",
    default: "", 
});
const currImageurl = atom({
    key: "currImageurl",
    default: "", 
});


const notification= atom({
    key:"notification",
    default:""
}
)
// Define a selector for fetching products
const ProdListSelector = selector({
    key: 'ProdListSelector',
    get: async () => {
        try {
            const response = await axios.get("http://localhost:3000/getAllProds");
            if (response.status === 200) {
                return response.data.data; // Return the product data
            } else {
                console.log('Failed to fetch products:', response.message);
                return [];
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            return []; // Return an empty array on error
        }
    },
});

export { ProdList, ProdListSelector,currProdID,editCheck,currProdName,currProdCode,currDesc,currReleasedate,currPrice,currRating,currImageurl,notification,loadingState };
