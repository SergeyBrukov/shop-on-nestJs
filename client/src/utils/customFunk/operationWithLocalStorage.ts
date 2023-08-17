import {ETypeOperationWithLocalStorage} from "../enums/enums";

type TOperationWithLocalStorage = (key: string, type: ETypeOperationWithLocalStorage, value?: string) => void

export const operationWithLocalStorage: TOperationWithLocalStorage = (key, type, value) => {

  switch (type) {
    case ETypeOperationWithLocalStorage.GET: {
      localStorage.getItem(key);
      return;
    }
    case ETypeOperationWithLocalStorage.ADD: {
      localStorage.setItem(key, value as string);
      return;
    }
    case ETypeOperationWithLocalStorage.remove: {
      localStorage.removeItem(key);
    }
  }
};