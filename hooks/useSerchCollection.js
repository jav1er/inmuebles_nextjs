import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useSerchCollection(collectionKey) {
  const [value] = useLocalStorage(collectionKey);
  const searchValue = (objectKey, objectValue) => {
    return value.some(object => object[objectKey] === objectValue);
  };

  return [searchValue];
}
