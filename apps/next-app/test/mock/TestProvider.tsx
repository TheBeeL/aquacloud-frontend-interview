import { Provider, WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { ReactElement } from "react";

interface HydrateAtomsProps {
  initialValues: Iterable<
    readonly [WritableAtom<unknown, any[], any>, unknown]
  >;
  children: ReactElement;
}

const HydrateAtoms = ({ initialValues, children }: HydrateAtomsProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }: HydrateAtomsProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

export default TestProvider;
