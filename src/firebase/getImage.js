import { storage } from "./settingFirebase";
import { ref, getDownloadURL } from "firebase/storage";

export default async function getImages(image) {
      const img=await getDownloadURL(ref(storage, "files/" + image))
  return img;
}
