import {lazy, Suspense} from "react";
import PageLoader from "../../elements/loaders/pageLoader/PageLoader";

const SuspenseWrapper = ({path}: { path: string }) => {
    const LazyComponent = lazy(() => import(`../../pages/${path}.tsx`));

    return (
        <Suspense fallback={<PageLoader />}>
            <LazyComponent />
        </Suspense>
    )
}

export default SuspenseWrapper