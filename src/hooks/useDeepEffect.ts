import { useEffect, useRef, EffectCallback, DependencyList } from "react";
import isEqual from "lodash/isEqual";

const useDeepEffect = (fn: EffectCallback, deps?: DependencyList): void => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect((): void => {
    const isFirstEffect = isFirst.current;
    const isSame = prevDeps.current?.every((obj, index) => isEqual(obj, deps?.[index]));

    isFirst.current = false;
    prevDeps.current = deps;

    if (isFirstEffect || !isSame) {
      fn();
    }
  }, deps);
};

export default useDeepEffect;
