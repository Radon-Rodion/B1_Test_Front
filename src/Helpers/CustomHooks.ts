import { AxiosResponse } from "axios";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export const useBlocker = (blocker: any, when = true) => { //unsafe logic in router lib so any types
  const navigator = (useContext(NavigationContext) as any).navigator
  useEffect(() => {
    if (!when)
      return;
    const unblock = navigator?.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx?.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
};

export function usePrompt(message: string, when = true) {
  const blocker = useCallback(
    (tx: any) => {
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );
  useBlocker(blocker, when);
}

export function debounce<A, R = void>(fn: (args: A) => R, ms: number): (args: A) => Promise<R> {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  return debouncedFunc;
}

export const useDebounce = <A = void, R = void>(setter: (val: A) => R, timeout: number) => useCallback(debounce<A, R>((val) => {
  return setter(val);
}, timeout), []);

export const useApi = <T>(
  request: () => Promise<AxiosResponse> | Promise<Response>, initialState: T,
  responseProcessor: (resp: AxiosResponse | Response) => T,
  finalAction = () => { }
) => {
  const [state, setState] = useState(initialState);

  const updateState = () => {
    request().then(resp => setState(responseProcessor(resp))).finally(() => finalAction());
  }

  useLayoutEffect(() => {
    updateState();
  }, []);

  return [state, setState, updateState] as [T, React.Dispatch<React.SetStateAction<T>>, () => void];
}

export const useUpdateEffect = (effect: () => void, deps: Array<any>) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
  }, deps);
}

export const usePrevious = <T>(newVal: T, deps: Array<any>) => {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = newVal;
  }, [deps]);

  return ref.current;
}

export const useRefState = <T>(initialValue: T) => {
  const ref = useRef<T>(initialValue);
  const setter = (val: T) => {
    if(ref.current == undefined) return;
    ref.current = val;
  }
  return [ref, setter] as [React.MutableRefObject<T>, (val: T) => void];
}

export const useUpdator = () => {
  const [updator, setUpdator] = useState(false);
  useEffect(() => console.log('UPDATING', updator), [updator]);
  return () => setUpdator(prevUpd => !prevUpd);
}
