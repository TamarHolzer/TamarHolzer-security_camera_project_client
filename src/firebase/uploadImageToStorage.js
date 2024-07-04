
import { storage } from "./settingFirebase";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function uploadImageToStorage(imageFile){
  if (imageFile) {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    uploadBytes(storageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        /**Send the URL's image to Xy_click for save in the DB */
        return url; 
      }).catch(err=>console.log(err));
    });
  }
};
