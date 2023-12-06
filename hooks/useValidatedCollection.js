import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useValidatedCollection(collectionKey) {
  const [value] = useLocalStorage(collectionKey);
  const searchValue = (objectKey, objectValue) => {


    //console.log(objectKey);
    //console.log(objectValue);
    //console.log('en update');
    //console.log(value.filter(object => object[objectKey] === objectValue));
    let result = value.filter(object => object[objectKey] === objectValue)
    return result[0] ;
  };

  return [searchValue];
}
