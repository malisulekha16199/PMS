import { atom } from 'recoil';

// Define the atom
const prodList = atom({
    key: "prodList",
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


export { prodList,currProdID,editCheck,currProdName,currProdCode,currDesc,currReleasedate,currPrice,currRating,currImageurl,notification,loadingState };
